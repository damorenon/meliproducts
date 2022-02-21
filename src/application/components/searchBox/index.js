import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../assets/static/logo.png';
import iconSearch from '../../assets/static/ic_Search.png';
import './index.scss';

/**
 * Component to present and handle the search bar.
 * It consumes '/api/items=search=' api
 *
 * @return {JSX.Element}
 */
function SearchBox() {
	// for controlled input
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	function handleInputChange(event) {
		setSearchInput(event.target.value);
	}

	async function handleFormSubmit(event) {
		event.preventDefault();
		const { data } = await axios(`/api/items?q=${searchInput}`);
		console.log('dispatch data: ', data);
		navigate('/items');
		/* .then((response) => response.json())
			.then((data) => console.log(data)); */
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
			<form className="searchbox__form" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="Nunca dejes de buscar"
					className="searchbox__input"
					value={searchInput}
					onChange={handleInputChange}
				/>
				<button type="submit" className="searchbox__submitbutton">
					<img src={iconSearch} alt="search icon" />
				</button>
			</form>
		</div>
	);
}

export default SearchBox;
