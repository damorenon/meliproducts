import React from 'react';
import styles from './index.module.scss';
import logoImage from '../../assets/static/logo.png';

function SearchBox() {
	return (
		<div className={styles.container}>
			<img src={logoImage} alt="logo" />
			SearchBox here
		</div>
	);
}

export default SearchBox;
