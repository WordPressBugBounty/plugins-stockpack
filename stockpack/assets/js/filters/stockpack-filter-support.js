import { AI_PROVIDER } from '../stockpack-generate';

const ORIENTATIONS = [ 'horizontal', 'vertical', 'square' ];
const NO_SQUARE = [ 'pixabay' ];
const GEN_AI = [ 'adobe_stock', 'freepik' ];

const slug = ( provider ) => ( provider || '' ).toLowerCase().replace( / /g, '_' );

export const filterSupport = ( provider ) => {
	const key = slug( provider );

	return {
		visible: key !== slug( AI_PROVIDER ),
		orientations: NO_SQUARE.includes( key ) ? _.without( ORIENTATIONS, 'square' ) : ORIENTATIONS,
		genAi: '' === key || GEN_AI.includes( key ),
	};
};
