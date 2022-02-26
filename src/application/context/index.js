import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

function stateReducer(state, action) {
	const { type, payload: { searchedProducts = {}, productDetail = {} } = {} } =
		action;
	switch (type) {
		case 'SET_SEARCHED_PRODUCTS':
			return { searchedProducts };
		case 'SET_PRODUCT_DETAIL':
			return { ...state, productDetail };
		case 'CLEAN_PRODUCT_DETAIL':
			return { ...state, productDetail: {} };
		default:
			return state;
	}
}

export const store = createContext({ searchedProducts: {}, productDetail: {} });
const { Provider } = store;

/**
 * Component that provides the global context for the application
 * @param {object} initialState the object used as initial state for the store
 * @param {JSX.Element} children the components that will receive the state from provider
 * @returns {JSX.Element}
 */
function StateProvider({ initialState, children }) {
	const [state, dispatch] = useReducer(stateReducer, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

StateProvider.propTypes = {
	initialState: PropTypes.shape({
		searchedProducts: PropTypes.shape({
			author: PropTypes.shape({
				name: PropTypes.string,
				lastname: PropTypes.string
			}),
			categories: PropTypes.arrayOf(PropTypes.string),
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					title: PropTypes.string,
					price: PropTypes.shape({
						currency: PropTypes.string,
						amount: PropTypes.number,
						decimals: PropTypes.number,
						symbol: PropTypes.string
					}),
					picture: PropTypes.string,
					condition: PropTypes.string,
					free_shipping: PropTypes.bool,
					location: PropTypes.string
				})
			)
		}),
		productDetail: PropTypes.shape({
			author: PropTypes.shape({
				name: PropTypes.string,
				lastname: PropTypes.string
			}),
			categories: PropTypes.arrayOf(PropTypes.string),
			item: PropTypes.shape({
				id: PropTypes.string,
				title: PropTypes.string,
				price: PropTypes.shape({
					currency: PropTypes.string,
					amount: PropTypes.number,
					decimals: PropTypes.number,
					symbol: PropTypes.string
				}),
				picture: PropTypes.string,
				condition: PropTypes.string,
				free_shipping: PropTypes.bool,
				sold_quantity: PropTypes.number,
				description: PropTypes.string
			})
		})
	}).isRequired,
	children: PropTypes.node.isRequired
};

export default StateProvider;
