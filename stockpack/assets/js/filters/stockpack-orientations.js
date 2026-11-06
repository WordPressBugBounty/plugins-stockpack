import StockpackSelectFilters from './stockpack-select-filter';

const StockpackOrientationFilters = StockpackSelectFilters.extend( /** @lends wp.media.view.AttachmentFilters.All.prototype */{
	className: 'search-filter orientation-filter',
	id: 'stockpack-orientation-filter',
	selectClass: 'attachment-filters',
	createFilters() {
		const strings = wp.media.view.l10n.stockpack.filters.orientation;

		this.filters = {
			any: { text: strings.any, props: { orientation: null }, priority: 10 },
			horizontal: { text: strings.horizontal, props: { orientation: 'horizontal' }, priority: 20 },
			vertical: { text: strings.vertical, props: { orientation: 'vertical' }, priority: 30 },
			square: { text: strings.square, props: { orientation: 'square' }, priority: 40 },
		};
		this.label = strings.label;
		this.name = 'orientation';
		this.default = null;
	},

	applySupport( support ) {
		this.$el.toggle( support.visible );

		this.$el.find( 'option' ).each( ( index, option ) => {
			const unavailable = 'any' !== option.value && ! support.orientations.includes( option.value );
			option.disabled = unavailable;
			option.hidden = unavailable;
		} );

		const value = this.model.get( 'orientation' );

		if ( value && ! support.orientations.includes( value ) ) {
			this.$el.find( 'select' ).val( 'any' );
			this.model.set( 'orientation', null );
		}
	},
} );

export default StockpackOrientationFilters;
