const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	mode: 'development',
	// __dirname: absolute route of current file, webpack-hot-middleware... helps to hot reload.
	entry: [
		path.join(__dirname, 'src/frontend/index.js')
		// 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/app.js',
		publicPath: '/'
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
				// Geerates 1 single css file with all sass/scss styles
				test: /\.s(a|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/frontend/index.html',
			filename: './index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
		}),
		new webpack.HotModuleReplacementPlugin() // helps with server hot reload
	],
	resolve: {
		extensions: ['.js', '.scss']
	}
};
