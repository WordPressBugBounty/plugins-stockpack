const StockpackSelectFilters = wp.media.View.extend( /** @lends wp.media.view.AttachmentFilters.prototype */{
	tagName: 'div',
	className: 'stockpack-select-filters',

	keys: [],

	initialize() {
		this.createFilters();
		_.extend( this.filters, this.options.filters );

		const selectId = this.id + '-select';
		const $mainLabel = jQuery( '<label></label>', { text: this.label, class: 'group-label', for: selectId } );
		const $select = jQuery( '<select />', { id: selectId, class: this.selectClass } );
		// Build `<option>` elements.
		$select.html( _.chain( this.filters ).map( function( filter, value ) {
			return {
				el: jQuery( '<option></option>' ).val( value ).html( filter.text )[ 0 ],
				priority: filter.priority || 50,
			};
		}, this ).sortBy( 'priority' ).pluck( 'el' ).value() );

		this.$el.prepend( $select );
		this.$el.prepend( $mainLabel );
		this.controller.on( 'update-filters', this.change, this );
	},

	dispose() {
		this.controller.off( 'update-filters', this.change, this );

		return wp.media.View.prototype.dispose.apply( this, arguments );
	},

	events: {
		change: 'triggerFilter',
	},

	render() {
		const value = this.model.get( this.name ) || null;
		const key = _.findKey( this.filters, ( filter ) => filter.props[ this.name ] === value );

		this.$el.find( 'select' ).val( key );

		return this;
	},

	triggerFilter( changeEvent ) {
		this.controller.trigger( 'update-filters', this.model, changeEvent.currentTarget );
	},


	/**
	 * @abstract
	 */
	createFilters() {
		this.filters = {};
	},

	/**
	 * When the selected filter changes, update the Attachment Query properties to match.
	 */
	change() {
		const filter = this.filters[ this.getValue() ];
		if ( filter ) {
			this.model.set( filter.props );
		}
	},

	getValue() {
		return this.$el.find( 'select' ).val();
	},

} );

export default StockpackSelectFilters;
