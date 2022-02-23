import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

function stateReducer(state, action) {
	const {
		type,
		payload: { items, categories }
	} = action;
	switch (type) {
		case 'SET_SEARCHED_PRODUCTS':
			return { items, categories };
		default:
			return state;
	}
}

export const store = createContext({
	items: [],
	categories: []
});
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
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		categories: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired,
	children: PropTypes.node.isRequired
};

export default StateProvider;
