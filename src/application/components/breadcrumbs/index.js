/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Component that presents the categories associated to the product(s) in the current view
 *
 * @param {Array} categories the list of strings that represents the category
 * @return {JSX.Element}
 */
function Breadcrumbs({ categories = [] }) {
	return (
		<nav>
			<ul className="breadcrumbs__container">
				{!!categories.length &&
					categories.map((category, index) => {
						const isLast = index === categories.length - 1;
						return (
							<li
								key={`${index}-${category}`}
								className={`${
									isLast ? 'breadcrumbs__item-last' : 'breadcrumbs__item'
								}`}
							>
								{category}
								{`${isLast ? '' : ' > '}`}{' '}
							</li>
						);
					})}
			</ul>
		</nav>
	);
}

Breadcrumbs.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Breadcrumbs;
