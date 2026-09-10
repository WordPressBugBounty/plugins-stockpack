jQuery( function( $ ) {
	const config = window.stockpackUpscale || {};
	const strings = config.strings || {};
	const POLL_FAST = 2000;
	const POLL_SLOW = 5000;
	const FAST_POLLS = 7;
	const MAX_POLLS = 60;

	const TOAST_COLOURS = {
		info: '#72aee6',
		success: '#00a32a',
		error: '#d63638',
	};

	let hideTimer = null;

	function notice( message, type, options ) {
		const kind = type || 'info';
		const settings = options || {};

		$( '.stockpack-upscale-toast' ).remove();
		window.clearTimeout( hideTimer );

		const $toast = $( '<div class="stockpack-upscale-toast" role="status" aria-live="polite" />' ).css( {
			position: 'fixed',
			right: '24px',
			bottom: '24px',
			zIndex: 100000,
			maxWidth: '380px',
			padding: '14px 16px',
			paddingRight: '38px',
			background: '#fff',
			borderLeft: '4px solid ' + ( TOAST_COLOURS[ kind ] || TOAST_COLOURS.info ),
			borderRadius: '4px',
			boxShadow: '0 4px 16px rgba(0,0,0,.18)',
			fontSize: '13px',
			lineHeight: '1.5',
			color: '#1d2327',
			wordBreak: 'break-word',
		} );

		if ( settings.spinner ) {
			// Core's own spinner, so it matches the admin and needs no keyframes
			// of ours on a screen that loads none of our css.
			$( '<span class="spinner is-active" />' ).css( {
				float: 'none',
				margin: '0 8px 0 0',
				verticalAlign: 'text-top',
			} ).appendTo( $toast );
		}

		$( '<span />' ).text( message ).appendTo( $toast );

		if ( settings.link ) {
			$( '<a target="_blank" rel="noopener" />' )
				.attr( 'href', settings.link )
				.text( settings.linkText || settings.link )
				.css( { marginLeft: '6px', fontWeight: 600 } )
				.appendTo( $toast );
		}

		$( '<button type="button" aria-label="Dismiss">&times;</button>' )
			.css( {
				position: 'absolute',
				top: '6px',
				right: '6px',
				border: 0,
				background: 'none',
				cursor: 'pointer',
				fontSize: '18px',
				lineHeight: 1,
				color: '#787c82',
			} )
			.on( 'click', function() {
				$toast.remove();
			} )
			.appendTo( $toast );

		$toast.appendTo( document.body );

		// Nothing times itself out. An upscale runs for around half a minute, so
		// a progress message that faded left the screen looking idle while
		// credits were being spent. Toasts go when the user dismisses them, when
		// the next one replaces them, or when the page reloads.
		if ( settings.hideAfter ) {
			hideTimer = window.setTimeout( function() {
				$toast.fadeOut( 200, function() {
					$toast.remove();

					if ( settings.thenShow ) {
						notice( settings.thenShow, settings.thenType, {
							spinner: settings.thenSpinner,
						} );
					}
				} );
			}, settings.hideAfter );
		}
	}

	let running = false;

	// Polling lives in this page. Leaving mid-upscale means Magnific finishes and
	// bills it while nothing is left to save the result, so the image is paid for
	// and lost.
	function guardUnload( event ) {
		if ( ! running ) {
			return undefined;
		}

		event.preventDefault();
		event.returnValue = strings.leaving || '';

		return event.returnValue;
	}

	function startRun() {
		running = true;
		window.addEventListener( 'beforeunload', guardUnload );
	}

	function endRun() {
		running = false;
		window.removeEventListener( 'beforeunload', guardUnload );
	}

	function post( data ) {
		return $.post( window.ajaxurl, data );
	}

	function requestError( xhr ) {
		const payload = xhr && xhr.responseJSON;

		if ( payload && payload.data && payload.data.message ) {
			return payload.data.message;
		}

		if ( xhr && 0 === xhr.status ) {
			return strings.timeout;
		}

		if ( xhr && xhr.status ) {
			return strings.failed + ' (HTTP ' + xhr.status + ')';
		}

		return strings.failed;
	}

	function poll( task, attempt ) {
		if ( attempt >= MAX_POLLS ) {
			endRun();
			notice( strings.timeout, 'error' );
			return;
		}

		window.setTimeout( function() {
			post( {
				action: 'generate_status-stockpack',
				security: config.nonceGenerate,
				task,
			} ).done( function( response ) {
				if ( ! response || ! response.success ) {
					endRun();
					notice( ( response && response.data && response.data.message ) || strings.failed, 'error' );
					return;
				}

				if ( 'pending' === response.data.status ) {
					poll( task, attempt + 1 );
					return;
				}

				download( response.data.id );
			} ).fail( function( xhr ) {
				endRun();
				notice( requestError( xhr ), 'error' );
			} );
		}, attempt < FAST_POLLS ? POLL_FAST : POLL_SLOW );
	}

	function download( task ) {
		notice( strings.saving, 'info', { spinner: true } );

		post( {
			action: 'download-stockpack',
			security: config.nonceDownload,
			media_id: task,
			provider: 'Magnific AI',
			post_id: 0,
		} ).done( function( response ) {
			if ( ! response || ! response.success ) {
				endRun();
				notice( ( response && response.data && response.data.message ) || strings.failed, 'error' );
				return;
			}

			endRun();
			notice( strings.done, 'success', { spinner: true } );

			const saved = response.data && response.data.id;

			window.setTimeout( function() {
				if ( saved && config.editUrl ) {
					window.location.href = config.editUrl + saved;
					return;
				}

				window.location.reload();
			}, 1200 );
		} ).fail( function( xhr ) {
			endRun();
			notice( requestError( xhr ), 'error' );
		} );
	}

	$( document ).on( 'click', '.stockpack-upscale', function( event ) {
		event.preventDefault();

		const $link = $( this );
		const factor = parseInt( $link.data( 'factor' ), 10 ) || 2;

		if ( running ) {
			// The only transient one: it must hand the screen back to the
			// progress message rather than bury it.
			notice( strings.busy, 'info', {
				hideAfter: 4000,
				thenShow: strings.working,
				thenType: 'info',
				thenSpinner: true,
			} );

			return;
		}

		const quote = ( config.upscale && config.upscale[ factor ] ) || {};

		if ( quote.refuse ) {
			notice( quote.refuse, 'error', {
				link: false === quote.link ? null : config.wallet && config.wallet.top_up_url,
				linkText: strings.topUp,
			} );

			return;
		}

		const question = quote.confirm || strings.confirm;

		if ( question && ! window.confirm( question ) ) {
			return;
		}

		startRun();
		notice( strings.working, 'info', { spinner: true } );

		post( {
			action: 'generate-stockpack',
			security: config.nonceGenerate,
			generate_action: 'upscale',
			image_url: $link.data( 'url' ),
			scale_factor: factor,
		} ).done( function( response ) {
			if ( ! response || ! response.success ) {
				endRun();
				notice( ( response && response.data && response.data.message ) || strings.failed, 'error', {
					link: response && response.data && response.data.link,
					linkText: response && response.data && response.data.link_text,
				} );
				return;
			}

			poll( response.data.task_id, 0 );
		} ).fail( function( xhr ) {
			endRun();
			notice( requestError( xhr ), 'error' );
		} );
	} );
} );
