import axios from 'axios';

/**
 * Method to get search's related products
 * @param {string} query String that contains search's keyword
 * @return {Object}
 */
export async function searchProducts(query) {
	let items = [];
	let categories = [];

	try {
		const response = await axios(
			`https://api.mercadolibre.com/sites/MLA/search?q=${query}`
		);
		const {
			data: { filters, results }
		} = response;

		// set categories for Breadcrumbs
		if (filters && filters.length) {
			const categoryFilter = filters.find((item) => item.id === 'category');
			if (categoryFilter) {
				categories = categoryFilter.values[0].path_from_root.map(
					(item) => item.name
				);
			}
		}

		// set searched items, 1st 4 products
		if (results && results.length) {
			items = results.slice(0, 4).map((item) => ({
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id,
					amount: item.price,
					decimals: 2 // TODO: it's not in search API, most likely we'll need a 2nd query with currency_id
				},
				picture: item.thumbnail,
				condition: item.condition,
				free_shiping: item.shipping.free_shipping,
				location: item.address.state_name // NOTE: this Attr is not in the requirements, but the view requests it
			}));
		}
	} catch (error) {
		console.log('Error while getting api.mercadolibre.com/sites/MLA/search');
	}

	return {
		author: { name: 'David', lastname: 'Moreno' },
		categories,
		items
	};
}

/**
 * Method to get the detail of any product
 * @param {string} productId String that contains the id of the product to be searched
 * @return {Object}
 */
export async function getProduct() {
	// TODO: Complete me!
	const response = await axios(
		'https://api.mercadolibre.com/items/MLA1123998092'
	);
	return response;
}
