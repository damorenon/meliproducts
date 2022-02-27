import React from 'react';
import notFoundIcon from '../../assets/static/ic_notfound.png';
import './index.scss';

function NotFound() {
	return (
		<div className="notfound__container">
			<img src={notFoundIcon} alt="Not found icon" />
			<div>
				<h3 className="notfound__title">
					No hay publicaciones que coincidan con tu búsqueda.
				</h3>
				<ul className="notfound__reasons">
					<li>Revisa la ortografía de la palabra</li>
					<li>Utiliza palabras más genéricas o menos palabras</li>
				</ul>
			</div>
		</div>
	);
}

export default NotFound;
