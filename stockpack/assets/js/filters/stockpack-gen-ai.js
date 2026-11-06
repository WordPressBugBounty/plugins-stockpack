import StockpackSelectFilters from './stockpack-select-filter';

const StockpackGenAiFilters = StockpackSelectFilters.extend( /** @lends wp.media.view.AttachmentFilters.All.prototype */{
	className: 'search-filter gen-ai-filter',
	id: 'stockpack-gen-ai-filter',
	selectClass: 'attachment-filters',
	createFilters() {
		const strings = wp.media.view.l10n.stockpack.filters.gen_ai;

		this.filters = {
			include: { text: strings.include, props: { gen_ai: null }, priority: 10 },
			exclude: { text: strings.exclude, props: { gen_ai: 'exclude' }, priority: 20 },
			only: { text: strings.only, props: { gen_ai: 'only' }, priority: 30 },
		};
		this.label = strings.label;
		this.name = 'gen_ai';
		this.default = null;
	},

	applySupport( support ) {
		this.$el.toggle( support.visible && support.genAi );
	},
} );

export default StockpackGenAiFilters;
