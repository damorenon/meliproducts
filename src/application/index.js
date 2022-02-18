import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import SearchResults from './components/searchResults';
import ProductDetail from './components/productDetail';
import './index.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="items" element={<SearchResults />} />
				<Route path="items/:id" element={<ProductDetail />} />
			</Route>
		</Routes>
	);
}

export default App;
