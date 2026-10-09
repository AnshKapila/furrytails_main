<?php
/**
 * Plugin Name: Furrytail — Nector Rewards
 * Description: Signs the logged-in customer for the Nector reward widget on the Next.js storefront, and renders the widget on store pages.
 * Version:     1.0.0
 *
 * INSTALL: upload to wp-content/mu-plugins/ft-nector.php, then add to
 *          wp-config.php (above "That's all, stop editing!"):
 *
 *            define( 'FT_NECTOR_API_KEY',        'ak_...' );
 *            define( 'FT_NECTOR_SIGNING_SECRET', 'ss_...' );
 *
 * ── Why ─────────────────────────────────────────────────────────────────────
 * Accounts live here, but customers browse furrytailjoy.com, which cannot see
 * who is logged in and must never hold the signing secret. So the storefront
 * asks this endpoint, with the customer's own login cookie:
 *
 *   GET /wp-admin/admin-ajax.php?action=ft_nector_auth
 *
 * and gets back { customer_id, lead_digest, timestamp } - the same values the
 * stock WooCommerce snippet prints into the page - or { customer_id: null }
 * for guests.
 *
 * admin-ajax rather than the REST API on purpose: REST ignores the login
 * cookie unless a nonce is sent, and the storefront has no way to get one.
 *
 * The browser sends the cookie because furrytailjoy.com and the store
 * subdomain are the same *site*, so SameSite=Lax still applies. CORS is locked
 * to the storefront origins below; any other site gets no CORS headers and the
 * browser withholds the response.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FT_NECTOR_ALLOWED_ORIGINS = array(
	'https://furrytailjoy.com',
	'https://www.furrytailjoy.com',
	'http://localhost:4321',
);

/**
 * Digest for one customer, exactly as Nector expects: HMAC-SHA256 of "id:ts".
 */
function ft_nector_sign( $user_id ) {
	$ts = (string) time();
	return array(
		'customer_id' => (string) $user_id,
		'lead_digest' => hash_hmac( 'sha256', $user_id . ':' . $ts, FT_NECTOR_SIGNING_SECRET ),
		'timestamp'   => $ts,
	);
}

function ft_nector_configured() {
	return defined( 'FT_NECTOR_API_KEY' ) && defined( 'FT_NECTOR_SIGNING_SECRET' );
}

function ft_nector_auth() {
	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
	if ( in_array( $origin, FT_NECTOR_ALLOWED_ORIGINS, true ) ) {
		header( 'Access-Control-Allow-Origin: ' . $origin );
		header( 'Access-Control-Allow-Credentials: true' );
	}
	header( 'Vary: Origin, Cookie' );
	// Per-customer response: must never be cached by LiteSpeed or the CDN.
	nocache_headers();

	$user_id = get_current_user_id();
	if ( ! $user_id || ! ft_nector_configured() ) {
		wp_send_json( array( 'customer_id' => null ) );
	}
	wp_send_json( ft_nector_sign( $user_id ) );
}
add_action( 'wp_ajax_ft_nector_auth', 'ft_nector_auth' );
add_action( 'wp_ajax_nopriv_ft_nector_auth', 'ft_nector_auth' );

/**
 * The widget on the store subdomain itself (account, cart, checkout) - the
 * stock WooCommerce snippet.
 */
add_action( 'wp_footer', function () {
	if ( ! ft_nector_configured() ) {
		return;
	}
	$user_id = get_current_user_id();

	if ( $user_id ) {
		$auth = ft_nector_sign( $user_id );
		$auth['api_key'] = FT_NECTOR_API_KEY;
		?>
		<script>
			window.nector_data = window.nector_data || {};
			if (!window.nector_data._auth) window.nector_data._auth = <?php echo wp_json_encode( $auth ); ?>;
		</script>
		<?php
	}
	?>
	<script async src="https://cdn.nector.io/nector-static/no-cache/reward-widget/mainloader.min.js"
		data-op="widget"
		data-api_key="<?php echo esc_attr( FT_NECTOR_API_KEY ); ?>"
		data-customer_id="<?php echo $user_id ? esc_attr( $user_id ) : ''; ?>"
		data-platform="woocommerce"
	></script>
	<?php
} );
