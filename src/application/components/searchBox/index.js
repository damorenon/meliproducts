import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { store } from '../../context';
import logoImage from '../../assets/static/logo.png';
import iconSearch from '../../assets/static/ic_Search.png';
import './index.scss';

/**
 * Component to present and handle the search bar.
 * It consumes '/api/items?search=' api
 *
 * @return {JSX.Element}
 */
function SearchBox() {
	// for controlled input
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();
	const { dispatch } = useContext(store);

	function onInputChange(event) {
		setSearchInput(event.target.value);
	}

	async function searchProducts(event) {
		event.preventDefault(); // To avoid page reload by default
		const { data: searchedProducts } = await axios(
			`/api/items?q=${searchInput}`
		);
		const { items, categories } = searchedProducts;
		dispatch({
			type: 'SET_SEARCHED_PRODUCTS',
			payload: { items, categories }
		});
		navigate('/items');
	}

	return (
		<div className="searchbox__container">
			<img
				src={logoImage}
				alt="logo"
				height="34"
				width="50"
				className="searchbox__logo"
			/>
			<form className="searchbox__form" onSubmit={searchProducts}>
				<input
					type="text"
					placeholder="Nunca dejes de buscar"
					className="searchbox__input"
					value={searchInput}
					onChange={onInputChange}
				/>
				<button type="submit" className="searchbox__submitbutton">
					<img src={iconSearch} alt="search icon" />
				</button>
			</form>
		</div>
	);
}

export default SearchBox;
