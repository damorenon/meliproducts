/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { store } from '../../context';
import Breadcrumbs from '../breadcrumbs';
import NotFound from '../notFound';
import './index.scss';

/**
 * Component that shows the detailed info of the selected product
 *
 * @returns {JSX.Element}
 */
function ProductDetail() {
	const { state: { productDetail = {} } = {}, dispatch } = useContext(store);
	const { item = {}, categories = [], apiError } = productDetail;
	const { id: productId } = useParams();

	async function getProductDetail() {
		try {
			const {
				data: { productDetail: foundProductDetail }
			} = await axios(`/api/items/${productId}`);
			dispatch({
				type: 'SET_PRODUCT_DETAIL',
				payload: { productDetail: foundProductDetail }
			});
		} catch (error) {
			dispatch({
				type: 'SET_PRODUCT_DETAIL',
				payload: { productDetail: { item: {}, categories: [], apiError: true } }
			});
		}
	}

	useEffect(() => {
		// NOTE: To avoid unneeded call when hydrating after SSR
		if (!Object.keys(item).length && !apiError) {
			getProductDetail();
		}
		return () => {
			dispatch({ type: 'CLEAN_PRODUCT_DETAIL' });
		};
	}, []);

	const {
		title,
		description,
		picture, // NOTE: should have a placeholder generic image
		condition,
		price = {},
		sold_quantity: soldQty
	} = item;

	function formatPrice({ symbol, amount, decimals }) {
		if (!amount) return '$ 0.00';
		const numberFormat = new Intl.NumberFormat('de-DE', {
			maximumFractionDigits: decimals
		});
		return `${symbol} ${numberFormat.format(parseFloat(amount))}`;
	}

	if (apiError) {
		return <NotFound />;
	}

	/* NOTE: should be ok to use a 'spinner + overlay' or skeleton placeholder while loading data */
	return (
		<section>
			{!!Object.keys(item).length && (
				<>
					<Breadcrumbs categories={categories} />
					<article className="productdetail__container">
						<div className="productdetail__product">
							<figure className="productdetail__imagecontainer">
								<img
									src={picture}
									alt="searched product"
									className="producdetail__image"
								/>
							</figure>
							<div>
								<h2 className="productdetail__desctitle">
									Descripci??n del Producto
								</h2>
								<p className="productdetail__description">{description}</p>
							</div>
						</div>
						<div className="productdetail__detail">
							<div className="productdetail__condition">{`${
								condition === 'new' ? 'Nuevo' : 'Usado'
							} - ${soldQty ?? 0} vendidos`}</div>
							<h2 className="productdetail__title">{title}</h2>
							<div className="productdetail__price">{formatPrice(price)}</div>
							<button type="button" className="productdetail__button">
								Comprar
							</button>
						</div>
					</article>
				</>
			)}
		</section>
	);
}

export default ProductDetail;
