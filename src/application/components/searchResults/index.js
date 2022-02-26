import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { store } from '../../context';
import Breadcrumbs from '../breadcrumbs';
import freeShippingIcon from '../../assets/static/ic_shipping.png';
import notFoundIcon from '../../assets/static/ic_notfound.png';
import './index.scss';

/**
 * Component that gets the list of searched products and present them to the user
 *
 * @return {JSX.Element}
 */
function SearchResults() {
	const { state: { searchedProducts = {} } = {} } = useContext(store);
	const { items = [], categories = [] } = searchedProducts;

	if (!items.length) {
		return (
			<div className="searchbox__notfound">
				<img src={notFoundIcon} alt="Not found icon" />
				<div>
					<h3 className="searchbox__notfoundtitle">
						No hay publicaciones que coincidan con tu búsqueda.
					</h3>
					<ul className="searchbox__notfoundreasons">
						<li>Revisa la ortografía de la palabra</li>
						<li>Utiliza palabras más genéricas o menos palabras</li>
					</ul>
				</div>
			</div>
		);
	}

	return (
		<section>
			<Breadcrumbs categories={categories} />
			<ul className="searchbox__itemslist">
				{items.map((item) => (
					<SearchedProduct key={item.id} product={item} />
				))}
			</ul>
		</section>
	);
}

export default SearchResults;

/**
 * Component that represents one single searched product.
 * It's not in a separate folder/file due to it's not reused in any other place
 *
 * @param {object} product the object with the data of teh searched product
 * @returns {JSX.Element}
 */
function SearchedProduct({ product }) {
	const {
		id,
		picture,
		location,
		price = {},
		free_shipping: freeShipping,
		title
	} = product;

	function formatPrice({ symbol, amount, decimals }) {
		// NOTE: 'es-ES' does not format 4 digit numbers as expected
		const numberFormat = new Intl.NumberFormat('de-DE', {
			maximumFractionDigits: decimals
		});
		return `${symbol} ${numberFormat.format(parseFloat(amount))}`;
	}

	return (
		<li className="sproduct__item">
			<article className="sproduct__container">
				<figure className="sproduct__imagecontainer">
					<Link to={id}>
						<img
							height="180"
							width="180"
							src={picture}
							alt="searched product"
							className="sproduct__image"
						/>
					</Link>
				</figure>
				<section className="sproduct__infocontainer">
					<div className="sproduct__info">
						<div className="sproduct__pricecontainer">
							<span className="sproduct__price">{formatPrice(price)}</span>
							{freeShipping && (
								<img
									src={freeShippingIcon}
									alt="free shipping icon"
									className="sproduct__freeshipping"
								/>
							)}
						</div>
						<h2 className="sproduct__title">
							<Link to={id}>{title}</Link>
						</h2>
						{/* TODO: how to add "completo único" ? */}
					</div>
					<div className="sproduct__location">{location}</div>
				</section>
			</article>
		</li>
	);
}

SearchedProduct.propTypes = {
	product: PropTypes.shape({
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
	}).isRequired
};
