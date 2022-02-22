import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../application/context';
import App from '../application';

ReactDOM.hydrate(
	<StateProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StateProvider>,
	document.getElementById('root')
);
