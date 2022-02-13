/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

const app = express();

dotenv.config();
const { ENV, PORT } = process.env;

if (ENV === 'development') {
	console.log('development config');
	// Config to have live-reloading on server, for development purposes
	const webpackConfig = require('../../webpack.config');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const compiler = webpack(webpackConfig);
	const { publicPath } = webpackConfig.output;
	const serverConfig = { serverSideRender: true, publicPath };

	app.use(webpackDevMiddleware(compiler, serverConfig));
	app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Mercado Libre - Búsqueda de productos</title>
			</head>
			<body>
				<noscript>
					Se necesita habilitar Javascript para ejecutar esta aplicación.
				</noscript>
				<div id="root"></div>
				<script src="assets/app.js" type="text/javascript"></script>
			</body>
		</html>
	`);
});

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Running nodemon server on port: ${PORT}`);
});
