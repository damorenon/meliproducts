const webpack = require('webpack');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // comment this for SSR
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();

const isDevelopment = process.env.ENV === 'development';

module.exports = {
	mode: 'development',
	// __dirname: absolute route of current file, webpack-hot-middleware... helps to hot reload.
	entry: [
		'@babel/polyfill',
		path.join(__dirname, 'src/client/index.js'),
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true' // comment this for CSR
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/app.js',
		publicPath: '/',
		assetModuleFilename: isDevelopment
			? 'assets/[name][ext]'
			: 'assets/[hash][ext]'
	},
	module: {
		// rules help webpack to transpile javascript files using babel before bundling them
		// we transpile to guarantee correct execution of the app in old browsers
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // Helps webpack to use babel-core (transpiler)
					options: {
						// presets tell babel what to transpile (X to Js)
						// @babel/preset-env' to transpile
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['react-hot-loader/babel']
					}
				}
			},
			{
				test: /\.scss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.png/,
				type: 'asset/resource'
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		// comment this HtmlWebpackPlugin for SSR
		/* new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/application/index.html'),
			inject: 'body'
		}), */
		new MiniCssExtractPlugin({
			filename: isDevelopment
				? 'assets/[name].css'
				: 'assets/[name].[hash].css',
			chunkFilename: isDevelopment
				? 'assets/[id].css'
				: 'assets/[id].[hash].css'
		}),
		new webpack.HotModuleReplacementPlugin() // helps with server hot reload
	],
	resolve: {
		extensions: ['.js', '.scss', '.png']
	}
};
