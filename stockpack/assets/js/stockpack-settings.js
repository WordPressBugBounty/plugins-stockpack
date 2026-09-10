jQuery( document ).ready( function( $ ) {

	var $element = jQuery( 'input.validate-stockpack-key' );

	function append_icon() {
		$element.after( '<span class="stockpack-verification"></span>' )
		$element.before( '<span class="stockpack-message">' + wp.media.view.l10n.stockpack.license + '</span>' )
	}

	function validate_key() {
		$element.parent().removeClass( 'valid' ).removeClass( 'invalid' );
		var val = $element.val();
		var options = options || {};
		options.data = _.extend( options.data || {}, {
			action: 'validate-stockpack',
			security: wp.media.view.settings.stockpack.nonce_validate,
			key: val,
		} );
		wp.media.ajax( options ).done( function( response ) {
			if ( response.status === 'passed' ) {
				$element.parent().removeClass( 'invalid' ).addClass( 'valid' )
			} else {
				$element.parent().removeClass( 'valid' ).addClass( 'invalid' )
			}
		} )
	}

	function addLinkAfterCheckboxText($id, $link) {
		$('input[name="'+$id+'"]').parents('label').after(' <a href="' + $link + '" target="_blank" class="provider-link"><span class="dashicons dashicons-admin-links"></span></a>');
	}

	function addProviderLinks(){
		addLinkAfterCheckboxText('stockpack_basics[providers][Adobe Stock]','https://stockpack.co/recommended/adobe_stock');
		addLinkAfterCheckboxText('stockpack_basics[providers][Deposit Photos]','https://stockpack.co/recommended/deposit_photos');
		addLinkAfterCheckboxText('stockpack_basics[providers][Getty]','https://stockpack.co/recommended/getty');
		addLinkAfterCheckboxText('stockpack_basics[providers][iStock]','https://stockpack.co/recommended/istock');
		addLinkAfterCheckboxText('stockpack_basics[providers][Pixabay]','https://stockpack.co/recommended/pixabay');
		addLinkAfterCheckboxText('stockpack_basics[providers][Pexels]','https://stockpack.co/recommended/pexels');
		addLinkAfterCheckboxText('stockpack_basics[providers][Unsplash]','https://stockpack.co/recommended/unsplash');
	}

	$element.keyup( _.debounce( validate_key, 250 ) );

	// run initially
	append_icon();
	addProviderLinks();
	validate_key();
} )
