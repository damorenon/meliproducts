const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

require('dotenv').config();

// NOTE: Another strategy could be to handle a different webpack.config files for each environment
const isDev = process.env.ENV === 'development';
const entry = ['@babel/polyfill', path.join(__dirname, 'src/client/index.js')];

if (isDev) {
	entry.push(
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
	);
}

module.exports = {
	mode: process.env.ENV, // development, production
	// devtool: 'inline-source-map', // NOTE: enable this config to get sourceMaps, for dev purposes only
	entry,
	output: {
		path: path.resolve(__dirname, 'src/server/public'),
		filename: isDev ? 'assets/app.js' : 'assets/app-[hash].js',
		publicPath: '/',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true
	},
	resolve: {
		extensions: ['.js', '.scss', '.png']
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					chunks: 'all',
					reuseExistingChunk: true,
					priority: 1,
					filename: isDev
						? 'assets/vendor.js'
						: 'assets/vendor-[contenthash].js',
					enforce: true,
					test(module, chunks) {
						const name = module.nameForCondition && module.nameForCondition();
						return (
							chunks.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name)
						);
					}
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // Helps webpack to use babel-core (transpiler)
					options: {
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
		!isDev ? new CompressionWebpackPlugin({ test: /\.js$|\.css$/ }) : () => {},
		isDev ? new webpack.HotModuleReplacementPlugin() : () => {}, // helps with server hot reload y dev mode
		!isDev ? new WebpackManifestPlugin() : () => {},
		new MiniCssExtractPlugin({
			filename: isDev ? 'assets/app.css' : 'assets/app-[hash].css'
		})
	]
};
