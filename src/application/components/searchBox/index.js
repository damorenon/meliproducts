import React from 'react';
import logoImage from '../../assets/static/logo.png';
import './index.scss';

function SearchBox() {
	return (
		<div className="searchbox__container">
			<img
				src={logoImage}
				alt="logo"
				height="34"
				width="50"
				className="searchbox__logo"
			/>
			SearchBox here
		</div>
	);
}

export default SearchBox;
