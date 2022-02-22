import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
	items: [],
	categories: []
};

function StateReducer(state, action) {
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

const store = createContext(initialState);
const { Provider } = store;

function StateProvider({ children }) {
	const [state, dispatch] = useReducer(StateReducer, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

StateProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export { store, StateProvider };
