import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Component that presents the categories associated to the product(s) in the current view
 *
 * @param {Array} categories the list of strings that represents the category
 * @return {JSX.Element}
 */
function Breadcrumbs({ categories }) {
	return (
		<nav className="breadcrumbs__container">
			{categories &&
				categories.length &&
				categories.map((category, index) => {
					const isLast = index === categories.length - 1;
					return (
						<span className={`${isLast ? 'breadcrumbs__item-last' : ''}`}>
							{category}
							{`${isLast ? '' : ' > '}`}{' '}
						</span>
					);
				})}
		</nav>
	);
}

Breadcrumbs.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Breadcrumbs;
