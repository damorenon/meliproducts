import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBox from '../searchBox';
import './index.scss';

/**
 * Component that handles the layout of the app
 *
 * @returns {JSX.Element}
 */
function Layout() {
	return (
		<>
			<header className="layout__header">
				<SearchBox />
			</header>
			<main className="layout__main">
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
