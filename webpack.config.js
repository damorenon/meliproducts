const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	// __dirname: absolute route of current file.
	entry: path.join(__dirname, 'src/frontend/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist')
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
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			// injects js files as <script> tags into the html template
			template: path.join(__dirname, 'src/frontend/index.html'),
			inject: 'body'
		})
	]
};
