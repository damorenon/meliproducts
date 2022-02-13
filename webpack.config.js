const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/frontend/index.html',
			filename: './index.html'
		}),
		new webpack.HotModuleReplacementPlugin() // helps with server hot reload
	]
};
