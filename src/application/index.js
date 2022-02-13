import React from 'react';
import SearchBox from './components/searchBox';
import Breadcrumbs from './components/breadcrumbs';
import SearchResults from './components/searchResults';
import ProductDetail from './components/productDetail';
import './index.scss';

function App() {
	return (
		<div>
			<SearchBox />
			<Breadcrumbs />
			<div>
				Router Here
				<SearchResults />
				<ProductDetail />
			</div>
		</div>
	);
}

export default App;
