<?php
/**
 * Plugin Name: Furrytail — Store Scope
 * Description: Keeps store.furrytailjoy.com to checkout/cart/account only. Redirects browsing to the storefront and noindexes the subdomain.
 * Version:     1.0.0
 *
 * INSTALL: upload to wp-content/mu-plugins/ft-store-scope.php
 *
 * ── Why ─────────────────────────────────────────────────────────────────────
 * The storefront is a Next.js app on furrytailjoy.com. WordPress here exists
 * only to take payment and hold accounts. But WooCommerce still publishes its
 * own /shop and /product/* pages, which:
 *
 *   - duplicate every product page on the real site, so two URLs compete for
 *     the same search results and the weaker one sometimes wins
 *   - let a customer end up browsing an unstyled catalogue they were never
 *     meant to see
 *
 * So: redirect browsing to the apex, keep the transactional paths, and noindex
 * the whole subdomain.
 *
 * ── Do not break these ──────────────────────────────────────────────────────
 * Razorpay's gateway callback arrives at /?wc-api=... on the HOME url, so a
 * blanket redirect of / silently breaks payments. The Store API (/wp-json) is
 * what the storefront reads its catalogue from. ?ft-checkout= is the cart
 * handoff. All three are allowed through below.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FT_STOREFRONT_URL = 'https://furrytailjoy.com';

/**
 * Should this request stay on the store subdomain?
 */
function ft_store_scope_is_allowed() {
	// Admin, login, cron, REST and AJAX: always.
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return true;
	}
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		return true;
	}

	// Gateway callbacks and our own cart handoff. wc-api is how Razorpay (and
	// most WooCommerce gateways) return the customer and post payment status -
	// redirecting it loses orders.
	foreach ( array( 'wc-api', 'ft-checkout', 'add-to-cart', 'wc-ajax' ) as $key ) {
		if ( isset( $_GET[ $key ] ) ) {
			return true;
		}
	}

	$uri = isset( $_SERVER['REQUEST_URI'] ) ? (string) $_SERVER['REQUEST_URI'] : '';
	$path = strtok( $uri, '?' );

	// Paths that must serve normally, including WooCommerce endpoints hanging
	// off them (order-pay, order-received, lost-password, view-order, ...).
	$keep = array(
		'/checkout',
		'/cart',
		'/my-account',
		'/wp-login.php',
		'/wp-json',
		'/wp-content',
		'/wp-includes',
		'/wp-admin',
	);
	foreach ( $keep as $prefix ) {
		if ( 0 === strpos( $path, $prefix ) ) {
			return true;
		}
	}

	// Belt and braces: WooCommerce's own view of what these pages are, in case
	// the permalinks are ever renamed.
	if ( function_exists( 'is_checkout' ) ) {
		if ( is_checkout() || is_cart() || is_account_page() ) {
			return true;
		}
	}

	return false;
}

/**
 * Where should a redirected request land on the storefront?
 *
 * Product and shop URLs map to their real equivalents so the redirect preserves
 * intent instead of dumping everyone on the home page.
 */
function ft_store_scope_target() {
	$uri  = isset( $_SERVER['REQUEST_URI'] ) ? (string) $_SERVER['REQUEST_URI'] : '/';
	$path = strtok( $uri, '?' );

	// /product/gentle-daily-shampoo-fig-neroli -> /products/gentle-daily-shampoo-fig-neroli
	if ( preg_match( '#^/product/([^/]+)/?$#', $path, $m ) ) {
		return FT_STOREFRONT_URL . '/products/' . rawurlencode( $m[1] );
	}

	if ( 0 === strpos( $path, '/shop' ) || 0 === strpos( $path, '/product-category' ) ) {
		return FT_STOREFRONT_URL . '/shop';
	}

	return FT_STOREFRONT_URL . '/';
}

function ft_store_scope_redirect() {
	if ( ft_store_scope_is_allowed() ) {
		return;
	}

	// Never let the redirect itself be cached.
	//
	// Both LiteSpeed and Hostinger's CDN had cached the pre-plugin 200 response
	// for '/' and kept serving it after this plugin was installed - the redirect
	// only appeared when a query string bypassed the cache. Purging works, but
	// the CDN caches per edge, so it recurs. Marking the response no-cache stops
	// a redirect from ever being stored in the first place.
	nocache_headers();
	header( 'X-LiteSpeed-Cache-Control: no-cache', true );
	do_action( 'litespeed_control_set_nocache', 'ft-store-scope: redirect response' );

	wp_redirect( ft_store_scope_target(), 301 );
	exit;
}
add_action( 'template_redirect', 'ft_store_scope_redirect', 1 );

/**
 * Nothing on this subdomain should ever be indexed: the transactional pages
 * must not be, and everything else is a duplicate of the storefront.
 */
function ft_store_scope_noindex_header() {
	if ( ! is_admin() ) {
		header( 'X-Robots-Tag: noindex, nofollow', true );
	}
}
add_action( 'send_headers', 'ft_store_scope_noindex_header' );

function ft_store_scope_noindex_meta() {
	echo '<meta name="robots" content="noindex, nofollow" />' . "\n";
}
add_action( 'wp_head', 'ft_store_scope_noindex_meta', 1 );

/** Stop advertising a sitemap for a subdomain that should not be crawled. */
add_filter( 'wp_sitemaps_enabled', '__return_false' );
