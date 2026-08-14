<?php
/**
 * Plugin Name: Furrytail — Checkout Handoff
 * Description: Rebuilds the WooCommerce cart from a Next.js cart and redirects to checkout.
 * Version:     1.0.0
 *
 * INSTALL: upload to wp-content/mu-plugins/ft-checkout.php
 *          (mu-plugins load automatically — no activation, cannot be deactivated
 *          by accident from the admin UI)
 *
 * ── What this does ──────────────────────────────────────────────────────────
 * The storefront at furrytailjoy.com keeps its cart in the browser. When the
 * customer checks out, it navigates here:
 *
 *   /?ft-checkout=1&items=paw-cleaner*2,gentle-daily-shampoo:fig-neroli*1
 *
 * Format: <product-slug>[:<variation-term-slug>]*<qty>, comma separated.
 *
 * We resolve the slugs, rebuild the cart server-side so WooCommerce prices and
 * stock are authoritative, then redirect to the real checkout. Because the
 * browser arrives by top-level navigation rather than fetch, there is no CORS
 * involved and WooCommerce sets its own session cookie normally.
 *
 * ── Notes ───────────────────────────────────────────────────────────────────
 * - The cart is emptied first, so re-clicking checkout replaces rather than
 *   accumulates.
 * - Unknown or unpurchasable slugs are skipped, never fatal. A customer must
 *   always reach checkout with whatever was valid.
 * - Prices from the browser are ignored entirely. WooCommerce recalculates.
 * - This URL MUST be excluded from LiteSpeed/CDN caching, or one customer's
 *   cart can be served to another. nocache_headers() is sent below, but add
 *   the exclusion in LiteSpeed too.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FT_CHECKOUT_MAX_LINES = 50;   // abuse guard
const FT_CHECKOUT_MAX_QTY   = 99;   // per line

/**
 * Resolve a product slug to its post ID.
 */
function ft_checkout_product_id_from_slug( $slug ) {
	$post = get_page_by_path( $slug, OBJECT, 'product' );
	return ( $post && 'product' === $post->post_type ) ? (int) $post->ID : 0;
}

/**
 * Find the variation of $product whose attributes include $term_slug.
 *
 * Matches on any attribute value rather than hardcoding pa_fragrance, so adding
 * a second variation attribute later doesn't silently break the handoff.
 *
 * @return array{0:int,1:array} [variation_id, attributes] — id 0 when not found.
 */
function ft_checkout_find_variation( $product, $term_slug ) {
	if ( ! $product || ! $product->is_type( 'variable' ) || '' === $term_slug ) {
		return array( 0, array() );
	}

	foreach ( $product->get_available_variations() as $variation ) {
		if ( empty( $variation['attributes'] ) || ! is_array( $variation['attributes'] ) ) {
			continue;
		}
		foreach ( $variation['attributes'] as $value ) {
			if ( is_string( $value ) && $value === $term_slug ) {
				return array( (int) $variation['variation_id'], $variation['attributes'] );
			}
		}
	}

	return array( 0, array() );
}

/**
 * Handle the handoff.
 *
 * Runs on wp_loaded (late) because that is when WooCommerce has initialised the
 * cart and session.
 */
function ft_checkout_handle() {
	if ( empty( $_GET['ft-checkout'] ) ) {
		return;
	}

	// Never let this fire for admin, cron, or REST requests.
	if ( is_admin() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		return;
	}

	nocache_headers();

	// WooCommerce must be present and its cart ready. Bail quietly to the home
	// page rather than white-screening if something is off.
	if ( ! function_exists( 'WC' ) || ! WC() || ! WC()->cart ) {
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}

	try {
		if ( WC()->session && ! WC()->session->has_session() ) {
			WC()->session->set_customer_session_cookie( true );
		}

		WC()->cart->empty_cart();

		$raw   = isset( $_GET['items'] ) ? wp_unslash( $_GET['items'] ) : '';
		$lines = array_filter( array_map( 'trim', explode( ',', (string) $raw ) ) );
		$lines = array_slice( $lines, 0, FT_CHECKOUT_MAX_LINES );

		$added   = 0;
		$skipped = array();

		foreach ( $lines as $line ) {
			// <slug>[:<variation-term>]*<qty>
			$parts = explode( '*', $line );
			$ref   = sanitize_text_field( $parts[0] );
			$qty   = isset( $parts[1] ) ? absint( $parts[1] ) : 1;
			$qty   = max( 1, min( FT_CHECKOUT_MAX_QTY, $qty ) );

			if ( '' === $ref ) {
				continue;
			}

			$bits         = explode( ':', $ref );
			$product_slug = sanitize_title( $bits[0] );
			$term_slug    = isset( $bits[1] ) ? sanitize_title( $bits[1] ) : '';

			$product_id = ft_checkout_product_id_from_slug( $product_slug );
			if ( ! $product_id ) {
				$skipped[] = $product_slug;
				continue;
			}

			$product = wc_get_product( $product_id );
			if ( ! $product || ! $product->is_purchasable() ) {
				$skipped[] = $product_slug;
				continue;
			}

			list( $variation_id, $variation_attrs ) = ft_checkout_find_variation( $product, $term_slug );

			// A variable product cannot be added without a variation. If the
			// term didn't resolve, skip rather than throwing a Woo notice.
			if ( $product->is_type( 'variable' ) && ! $variation_id ) {
				$skipped[] = $product_slug . ( $term_slug ? ':' . $term_slug : '' );
				continue;
			}

			$result = WC()->cart->add_to_cart(
				$product_id,
				$qty,
				$variation_id,
				$variation_attrs
			);

			if ( $result ) {
				$added++;
			} else {
				$skipped[] = $product_slug;
			}
		}

		if ( ! empty( $skipped ) ) {
			error_log( '[ft-checkout] skipped: ' . implode( ', ', $skipped ) );
		}

		// Nothing valid — send them to the shop rather than an empty checkout.
		if ( 0 === $added ) {
			wp_safe_redirect( wc_get_page_permalink( 'shop' ) ?: home_url( '/' ) );
			exit;
		}

		WC()->cart->calculate_totals();
		wp_safe_redirect( wc_get_checkout_url() );
		exit;

	} catch ( Throwable $e ) {
		// A fatal here would take out the whole site for this request, so the
		// customer gets the cart page and we keep the detail in the log.
		error_log( '[ft-checkout] ' . $e->getMessage() );
		wp_safe_redirect( wc_get_cart_url() ?: home_url( '/' ) );
		exit;
	}
}
add_action( 'wp_loaded', 'ft_checkout_handle', 30 );
