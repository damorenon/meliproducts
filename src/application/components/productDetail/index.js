/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { store } from '../../context';
import Breadcrumbs from '../breadcrumbs';

function ProductDetail() {
	const { state: { productDetail = {} } = {}, dispatch } = useContext(store);
	const { item = {}, categories = [] } = productDetail;
	const { id: productId } = useParams();

	async function getProductDetail() {
		const {
			data: { productDetail: foundProductDetail }
		} = await axios(`/api/items/${productId}`);
		dispatch({
			type: 'SET_PRODUCT_DETAIL',
			payload: { productDetail: foundProductDetail }
		});
	}

	useEffect(() => {
		getProductDetail();
		return () => {
			dispatch({ type: 'CLEAN_PRODUCT_DETAIL' });
		};
	}, []);

	return (
		<section>
			<Breadcrumbs categories={categories} />
			{item.title}
			{item.description}
		</section>
	);
}

export default ProductDetail;
