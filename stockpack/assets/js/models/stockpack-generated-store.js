const LIMIT = 50;

function storageKey() {
	const settings = ( wp.media.view.settings && wp.media.view.settings.stockpack ) || {};

	return 'stockpack_generated_' + ( settings.cache_key || 'default' );
}

function read() {
	try {
		const stored = window.localStorage.getItem( storageKey() );
		const parsed = stored ? JSON.parse( stored ) : [];

		return _.isArray( parsed ) ? parsed : [];
	} catch ( error ) {
		return [];
	}
}

function write( images ) {
	try {
		window.localStorage.setItem( storageKey(), JSON.stringify( images ) );
	} catch ( error ) {
	}
}

let generated = read();

export function generatedImages() {
	return generated.slice();
}

export function rememberGeneratedImage( image ) {
	generated = [ image ].concat( generated.filter( function( existing ) {
		return existing.id !== image.id;
	} ) ).slice( 0, LIMIT );

	write( generated );

	return generated.slice();
}

export function clearGeneratedImages() {
	generated = [];
	write( generated );
}
