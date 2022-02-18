import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBox from '../searchBox';
import Breadcrumbs from '../breadcrumbs';

function Layout() {
	return (
		<>
			<header>
				<SearchBox />
			</header>
			<nav>
				<Breadcrumbs />
			</nav>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
