import { clearGeneratedImages, generatedImages } from './models/stockpack-generated-store';

const AI_PROVIDER = 'Magnific AI';

const GENERATED_PROVIDER = 'magnific';

const StockpackGenerate = wp.media.View.extend( {
	tagName: 'div',
	className: 'stockpack-generate',
	id: 'stockpack-generate',

	events: {
		'click .stockpack-generate-button': 'generate',
		'click .stockpack-generate-clear': 'clear',
		'keydown .stockpack-generate-prompt': 'maybeGenerate',
		'change .stockpack-generate-model': 'showCost',
		'change .stockpack-generate-refine': 'showCost',
	},

	initialize() {
		this.model.on( 'change:provider', this.toggle, this );

		if ( this.options.selection ) {
			this.options.selection.on( 'selection:single', this.updateRefine, this );
			this.options.selection.on( 'selection:unsingle', this.updateRefine, this );
		}

		if ( this.options.collection ) {
			this.options.collection.on( 'add reset', this.updateClear, this );
			this.options.collection.on( 'add', this.imageArrived, this );
		}

		this.controller.on( 'generation:failed', this.stopWaiting, this );

		window.jQuery( document ).on( 'stockpack:wallet.stockpackGenerate', ( event, wallet ) => this.showBalance( wallet ) );
	},

	remove() {
		window.jQuery( document ).off( 'stockpack:wallet.stockpackGenerate' );

		return wp.media.View.prototype.remove.apply( this, arguments );
	},

	imageArrived() {
		this.stopWaiting();
		this.$el.find( '.stockpack-generate-refine' ).prop( 'checked', false );

		if ( this.options.selection ) {
			this.options.selection.reset();
		}

		this.updateRefine();
	},

	l10n() {
		const strings = wp.media.view.l10n.stockpack.generate || {};
		return {
			prompt: strings.prompt || 'Describe the image you want',
			button: strings.button || 'Generate',
			working: strings.working || 'Generating…',
			models: strings.models || { 'mystic-25': 'Mystic 2.5', 'flux-1': 'Flux.1' },
			credits: strings.credits || {},
			cost: strings.cost || '%s / image',
			note: strings.note || '',
			refine: strings.refine || {},
			wallet: strings.wallet || {},
		};
	},

	isActive() {
		return AI_PROVIDER === this.model.get( 'provider' );
	},

	render() {
		const strings = this.l10n();
		let options = '';

		_.each( strings.models, function( label, value ) {
			options += '<option value="' + _.escape( value ) + '">' + _.escape( label ) + '</option>';
		} );

		this.$el.html(
			'<input type="text" class="stockpack-generate-prompt" placeholder="' + _.escape( strings.prompt ) + '" />' +
			'<select class="stockpack-generate-model">' + options + '</select>' +
			'<label class="stockpack-generate-refine-label" title="' + _.escape( strings.refine.hint || '' ) + '">' +
			'<input type="checkbox" class="stockpack-generate-refine" disabled />' +
			_.escape( strings.refine.label || 'Refine the selected image' ) + '</label>' +
			'<button type="button" class="button button-primary stockpack-generate-button">' +
			_.escape( strings.button ) + '</button>' +
			'<button type="button" class="button-link stockpack-generate-clear">' +
			_.escape( strings.clear || 'Clear' ) + '</button>' +
			'<span class="stockpack-generate-cost" title="' + _.escape( strings.note ) + '"></span>' +
			'<span class="stockpack-generate-balance"></span>' +
			'<span class="stockpack-generate-status" aria-live="polite">' +
			'<span class="stockpack-generate-pulse" aria-hidden="true"></span>' +
			'<span class="stockpack-generate-elapsed"></span></span>'
		);

		this.updateClear();
		this.updateRefine();
		this.showCost();
		this.showBalance();
		this.toggle();

		_.defer( () => this.toggle() );

		return this;
	},

	selectedImage() {
		if ( ! this.options.selection ) {
			return null;
		}

		const single = this.options.selection.single();

		if ( ! single || ! single.get( 'url' ) || GENERATED_PROVIDER !== single.get( 'provider' ) ) {
			return null;
		}

		return single;
	},

	updateRefine() {
		const usable = !! this.selectedImage();
		const $box = this.$el.find( '.stockpack-generate-refine' );

		if ( ! usable ) {
			$box.prop( 'checked', false );
		}

		$box.prop( 'disabled', ! usable );

		this.$el.find( '.stockpack-generate-refine-label' )
			.css( 'display', usable ? 'inline-flex' : 'none' );

		this.showCost();
	},

	isRefining() {
		return this.$el.find( '.stockpack-generate-refine' ).is( ':checked' ) && !! this.selectedImage();
	},


	startWaiting() {
		const strings = this.l10n();

		this.startedAt = new Date().getTime();
		this.$el.addClass( 'is-generating' );
		this.$el.find( '.stockpack-generate-button' ).prop( 'disabled', true );

		this.coreSpinner().css( 'display', 'none' );

		const tick = () => {
			const seconds = Math.round( ( new Date().getTime() - this.startedAt ) / 1000 );

			this.$el.find( '.stockpack-generate-elapsed' ).text(
				( strings.working || 'Generating…' ) + ' ' + seconds + 's'
			);
		};

		tick();
		this.waitTimer = window.setInterval( tick, 1000 );

		this.waitLimit = window.setTimeout( () => this.stopWaiting(), 5 * 60 * 1000 );
	},

	stopWaiting() {
		if ( this.waitTimer ) {
			window.clearInterval( this.waitTimer );
			this.waitTimer = null;
		}

		if ( this.waitLimit ) {
			window.clearTimeout( this.waitLimit );
			this.waitLimit = null;
		}

		this.$el.removeClass( 'is-generating' );
		this.$el.find( '.stockpack-generate-button' ).prop( 'disabled', false );
		this.$el.find( '.stockpack-generate-elapsed' ).text( '' );
		this.coreSpinner().css( 'display', '' );
	},

	coreSpinner() {
		return this.$el.closest( '.stockpack-browser' ).find( '> .media-toolbar .spinner' );
	},

	updateClear() {
		this.$el.find( '.stockpack-generate-clear' )
			.css( 'display', generatedImages().length ? 'inline-block' : 'none' );
	},

	clear() {
		clearGeneratedImages();
		this.updateClear();

		this.model.set( {
			search: '',
			refine_url: '',
			seed: new Date().getTime(),
		} );
	},

	showCost() {
		const strings = this.l10n();
		const model = this.$el.find( '.stockpack-generate-model' ).val();
		const cost = strings.credits[ model ];
		const refining = this.isRefining();
		const $cost = this.$el.find( '.stockpack-generate-cost' );

		if ( 'unavailable' === strings.wallet.mode ) {
			$cost.empty().addClass( 'is-unavailable' ).attr( 'title', '' )
				.append( document.createTextNode( ( strings.wallet.unavailable || '' ) + ' ' ) )
				.append( this.link( strings.wallet.connect_url, strings.wallet.connect ) )
				.append( document.createTextNode( ' · ' ) )
				.append( this.link( strings.wallet.top_up_url, strings.wallet.top_up ) );
			return;
		}

		if ( ! cost ) {
			$cost.text( '' );
			return;
		}

		const multiplier = refining ? ( strings.refine.multiply || 2 ) : 1;
		const shown = 1 === multiplier ? cost : cost + ' × ' + multiplier;

		$cost.text( strings.cost.replace( '%s', shown ) )
			.attr( 'title', refining && strings.refine.note ? strings.refine.note : strings.note );
	},

	link( url, text ) {
		return window.jQuery( '<a target="_blank" rel="noopener"></a>' )
			.attr( 'href', url || '#' )
			.text( text || url || '' );
	},

	showBalance( wallet ) {
		const strings = this.l10n();
		const state = wallet || strings.wallet;
		const $balance = this.$el.find( '.stockpack-generate-balance' );

		if ( ! state || 'managed' !== state.mode ) {
			$balance.hide().empty();
			return;
		}

		const label = ( strings.wallet.balance_label || 'Balance: %s credits' )
			.replace( '%s', state.balance_text || String( state.balance || 0 ) );

		$balance.empty()
			.append( document.createTextNode( label + ' ' ) )
			.append( this.link( state.top_up_url || strings.wallet.top_up_url, strings.wallet.top_up ) )
			.css( 'display', 'inline' );
	},

	toggle() {
		const active = this.isActive();

		this.$el.css( 'display', active ? 'inline-flex' : 'none' );

		this.$el.closest( '.media-toolbar-primary' )
			.toggleClass( 'stockpack-generating', active );
	},

	maybeGenerate( event ) {
		if ( 13 === event.keyCode ) {
			event.preventDefault();
			this.generate();
		}
	},

	generate() {
		const prompt = this.$el.find( '.stockpack-generate-prompt' ).val();

		if ( ! prompt ) {
			return;
		}

		const refining = this.isRefining();
		const source = refining ? this.selectedImage() : null;

		this.startWaiting();

		this.model.set( {
			search: prompt,
			ai_model: this.$el.find( '.stockpack-generate-model' ).val(),
			refine_url: source ? source.get( 'url' ) : '',
			seed: new Date().getTime(),
		} );
	},
} );

export { AI_PROVIDER };
export default StockpackGenerate;
