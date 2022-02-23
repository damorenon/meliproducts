/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../application';
import StateProvider from '../application/context';
import { searchProducts } from './api';

const app = express();

dotenv.config();
const { ENV, PORT } = process.env;

if (ENV === 'development') {
	console.log('development config');
	// Config to have live-reloading on server, ony for development purposes
	const webpackConfig = require('../../webpack.config');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const compiler = webpack(webpackConfig);
	const { publicPath } = webpackConfig.output;
	const serverConfig = { serverSideRender: true, publicPath };
	app.use(webpackDevMiddleware(compiler, serverConfig));
	app.use(webpackHotMiddleware(compiler));
}

function setResponse(reactAppHtml, initialData) {
	// TODO: take application/index.html template instead of a hardcoded string
	return `
		<!DOCTYPE html>
		<html lang="es-CO">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Mercado Libre - Búsqueda de productos - SSR</title>
				<link href="/assets/main.css" rel="stylesheet">
			</head>
			<body>
				<div id="root">${reactAppHtml}</div>
				<script>
					window.__initial_data__ = ${JSON.stringify(initialData)}
				</script>
				<script src="assets/app.js" type="text/javascript"></script>
			</body>
		</html>
	`;
}

function renderApp(req, initialData = null) {
	// TODO: consume api to get data into a context for SSR
	const reactAppHtml = renderToString(
		<StateProvider initialState={initialData}>
			<StaticRouter location={req.url}>
				<App />
			</StaticRouter>
		</StateProvider>
	);
	return setResponse(reactAppHtml, initialData);
}

/* SSR views */
app.get('/', (req, res) => {
	res.send(renderApp(req));
});

app.get('/items', async (req, res) => {
	const searchedProducts = await searchProducts(req.query.search);
	res.send(renderApp(req, searchedProducts));
});

app.get('/items/:id', (req, res) => {
	res.send(renderApp(req));
});

/* API to get products */
app.get('/api/items', async (req, res) => {
	// Example: /api/items?q=ipod
	const searchedProducts = await searchProducts(req.query.q);
	res.send(searchedProducts);
});

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Running nodemon server on port: ${PORT}`);
});
