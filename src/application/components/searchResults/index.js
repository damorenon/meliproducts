import React, { useContext } from 'react';
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
	const { state: { items = [], categories = [] } = {} } = useContext(store);

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
			<ul>
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
		picture,
		location,
		price, // TODO: apply money format
		free_shipping: freeShipping,
		title
	} = product;
	const { amount } = price;

	return (
		<li>
			<article className="sproduct__container">
				<figure className="sproduct__picture">
					<img height="180" width="180" src={picture} alt="searched product" />
				</figure>
				<section className="sproduct__infocontainer">
					<div className="sproduct__info">
						<div className="sproduct__pricecontainer">
							<span className="sproduct__price">{`$ ${amount}`}</span>
							{freeShipping && (
								<img
									src={freeShippingIcon}
									alt="free shipping icon"
									className="sproduct__freeshipping"
								/>
							)}
						</div>
						<h2 className="sproduct__title">{title}</h2>
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
