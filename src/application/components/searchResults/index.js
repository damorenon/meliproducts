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

	return (
		<section>
			<Breadcrumbs categories={categories} />
			<ul>
				{items && !!items.length
					? items.map((item) => <SearchedProduct product={item} />)
					: 'No hay publicaciones que coincidan con tu búsqueda.'}
			</ul>
		</section>
	);
}

export default SearchResults;

// ----------- subcomponent --------

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
		price: {
			currency: PropTypes.string,
			amount: PropTypes.number,
			decimals: PropTypes.number
		},
		picture: PropTypes.string,
		condition: PropTypes.string,
		free_shipping: PropTypes.bool,
		location: PropTypes.string
	}).isRequired
};
