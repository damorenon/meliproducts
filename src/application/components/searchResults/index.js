import React, { useContext } from 'react';
import { store } from '../../context';
import Breadcrumbs from '../breadcrumbs';

/**
 * Component that gets the list of searched products and present them to the user
 *
 * @return {JSX.Element}
 */
function SearchResults() {
	const {
		state: { items, categories }
	} = useContext(store);

	return (
		<section>
			<Breadcrumbs categories={categories} />
			{items && items.length
				? items.map((item) => item.title)
				: 'No hay publicaciones que coincidan con tu búsqueda.'}
		</section>
	);
}

export default SearchResults;
