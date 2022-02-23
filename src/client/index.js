/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StateProvider from '../application/context';
import App from '../application';

const initialState = {
	items: [],
	categories: []
};
const preloadedState = window.__initial_data__ || initialState;
delete window.__initial_data__;

ReactDOM.hydrate(
	<StateProvider initialState={preloadedState}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StateProvider>,
	document.getElementById('root')
);
