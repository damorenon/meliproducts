import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { store } from '../../context';
import Breadcrumbs from '../breadcrumbs';
import freeShippingIcon from '../../assets/static/ic_shipping.png';
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
			// TODO: make a more beautiful message
			<div className="searchbox_notfound">
				No hay publicaciones que coincidan con tu búsqueda.
			</div>
		);
	}

	return (
		<section>
			<Breadcrumbs categories={categories} />
			<ul className="searchbox_itemslist">
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
		price,
		free_shipping: freeShipping,
		title
	} = product;
	const { amount } = price;

	return (
		<li className="sproduct__item">
			<article className="sproduct__container">
				<figure className="sproduct__picture">
					<Link to={id}>
						<img
							height="160"
							width="160"
							src={picture}
							alt="searched product"
						/>
					</Link>
				</figure>
				<section className="sproduct__infocontainer">
					<div className="sproduct__info">
						<div className="sproduct__pricecontainer">
							{/* TODO: apply price format */}
							<span className="sproduct__price">{`$ ${amount}`}</span>
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
			decimals: PropTypes.number
		}),
		picture: PropTypes.string,
		condition: PropTypes.string,
		free_shipping: PropTypes.bool,
		location: PropTypes.string
	}).isRequired
};
