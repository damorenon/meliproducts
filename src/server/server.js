/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../application';
import StateProvider from '../application/context';
import { searchProducts, getProductDetail } from './api';
import getManifest from './getManifest';

const app = express();

dotenv.config();
const { ENV, PORT } = process.env;

if (ENV === 'development') {
	// Config to have live-reloading on server, ony for development purposes
	const webpackConfig = require('../../webpack.config');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const compiler = webpack(webpackConfig);
	const { publicPath } = webpackConfig.output;
	const serverConfig = { serverSideRender: true, publicPath };
	app.use(webpackDevMiddleware(compiler, serverConfig));
	app.use(webpackHotMiddleware(compiler));
} else if (ENV === 'production') {
	app.use((req, _, next) => {
		if (!req.hashManifest) req.hashManifest = getManifest();
		next();
	});
	app.use(express.static(`${__dirname}/public`)); // where to get bundles
	app.use(
		helmet({
			// TODO : check for appropriate config, we should not simply disable it (only for test purposes)
			contentSecurityPolicy: false,
			crossOriginEmbedderPolicy: false,
			crossOriginOpenerPolicy: false,
			crossOriginResourcePolicy: false
		})
	);
	app.disable('x-powered-by');
}

function setResponse(reactAppHtml, initialData, manifest) {
	const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
	const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';

	return `
		<!DOCTYPE html>
		<html lang="es-CO">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Mercado Libre - Búsqueda de productos - SSR</title>
				<link href="${mainStyles}" rel="stylesheet">
			</head>
			<body>
				<div id="root">${reactAppHtml}</div>
				<script>
					window.__initial_data__ = ${JSON.stringify(initialData)}
				</script>
				<script src="${mainBuild}" type="text/javascript"></script>
			</body>
		</html>
	`;
}

function renderApp(req, initialData = {}) {
	const reactAppHtml = renderToString(
		<StateProvider initialState={initialData}>
			<StaticRouter location={req.url}>
				<App />
			</StaticRouter>
		</StateProvider>
	);
	return setResponse(reactAppHtml, initialData, req.hashManifest);
}

/* SSR views */
app.get('/', (req, res) => {
	res.send(renderApp(req));
});

app.get('/items', async (req, res) => {
	// Example: /items?search=ipod
	const searchedProducts = await searchProducts(req.query.search);
	res.send(renderApp(req, { searchedProducts }));
});

app.get('/items/:id', async (req, res) => {
	const productDetail = await getProductDetail(req.params.id);
	res.send(renderApp(req, { productDetail }));
});

/* API to get products */
app.get('/api/items', async (req, res) => {
	// Example: /api/items?q=ipod
	const searchedProducts = await searchProducts(req.query.q);
	res.send({ searchedProducts });
});

app.get('/api/items/:id', async (req, res) => {
	// Example: /api/items/MLA1123998092
	const productDetail = await getProductDetail(req.params.id);
	res.send({ productDetail });
});

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Running nodemon ${ENV} server on port: ${PORT}`);
});
