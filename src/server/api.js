import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { API_URL } = process.env;
const author = { name: 'David', lastname: 'Moreno' };

/**
 * Method to get search's related products
 * @param {string} query String that contains search's keyword
 * @return {Object}
 */
export async function searchProducts(query) {
	let items = [];
	let categories = [];
	let apiError = false;

	try {
		const response = await axios(`${API_URL}/sites/MLA/search?q=${query}`);
		const {
			data: { filters, results }
		} = response;

		if (results && results.length) {
			// set searched items
			items = results.slice(0, 4).map((item) => ({
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id,
					amount: item.price,
					decimals: 2, // NOTE: it's not in search API, it should be there, I'd request it to Backend, we should avoid 4 api calls here
					symbol: '$' // NOTE: it's not in search API, it should be there, I'd request it to Backend, we should avoid 4 api calls here
				},
				picture: item.thumbnail,
				condition: item.condition,
				free_shipping: item.shipping.free_shipping,
				location: item.address.state_name // NOTE: this Attr is not in the requirements, but the view requests it
			}));

			// set categories for Breadcrumbs
			if (filters && filters.length) {
				const categoryFilter = filters.find((item) => item.id === 'category');
				if (
					categoryFilter &&
					categoryFilter.values &&
					categoryFilter.values[0]
				) {
					categories = categoryFilter.values[0].path_from_root.map(
						(item) => item.name
					);
				}
			}
		}
	} catch (error) {
		console.log(
			`Error while getting ${API_URL}/sites/MLA/search?q=${query}: ${error}`
		);
		apiError = true;
	}

	return {
		author,
		categories,
		items,
		apiError
	};
}

async function fetcher(url) {
	const response = await axios(url);
	return response;
}

/**
 * Method to get the detail of any product
 * @param {string} productId String that contains the id of the product to be searched
 * @return {Object}
 */
export async function getProductDetail(productId) {
	let item = {};
	let categories = [];
	let apiError = false;

	try {
		const productPromises = Promise.all([
			fetcher(`${API_URL}/items/${productId}`),
			fetcher(`${API_URL}/items/${productId}/description`)
		]);
		const [itemResponse, descriptionResponse] = await productPromises;
		const { data: productInfo = null } = itemResponse;

		if (productInfo) {
			const { currency_id: currencyId, category_id: categoryId } = productInfo;
			const dataPromises = Promise.all([
				fetcher(`${API_URL}/categories/${categoryId}`),
				fetcher(`${API_URL}/currencies/${currencyId}`)
			]);
			const [categoryResponse, currencyResponse] = await dataPromises;

			const {
				data: { symbol, decimal_places: decimalPlaces }
			} = currencyResponse;

			const {
				data: { plain_text: description }
			} = descriptionResponse;

			// set Item stuff
			item = {
				id: productInfo.id,
				title: productInfo.title,
				price: {
					currency: currencyId,
					amount: productInfo.price,
					decimals: decimalPlaces,
					symbol // NOTE: this Attr is not in the requirements, but the view requests it
				},
				picture: productInfo.thumbnail,
				condition: productInfo.condition,
				free_shipping: productInfo.shipping.free_shipping,
				sold_quantity: productInfo.sold_quantity,
				description
			};

			// set categories for Breadcrumbs
			const {
				data: { path_from_root: categoriesList }
			} = categoryResponse;

			if (categoriesList && categoriesList.length) {
				categories = categoriesList.map((category) => category.name);
			}
		}
	} catch (error) {
		console.log(
			`Error while getting ${API_URL}/items/${productId} and others: ${error}`
		);
		apiError = true;
	}

	return {
		author,
		item,
		categories,
		apiError
	};
}
