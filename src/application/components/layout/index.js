import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBox from '../searchBox';
import Breadcrumbs from '../breadcrumbs';
import './index.scss';

function Layout() {
	return (
		<>
			<header className="header__container">
				<SearchBox />
			</header>
			<main className="main__container">
				<nav>
					<Breadcrumbs />
				</nav>
				<section>
					<Outlet />
				</section>
			</main>
		</>
	);
}

export default Layout;
