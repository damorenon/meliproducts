require('ignore-styles'); // ignores styles when rendering the app on server side
require('@babel/polyfill'); // Helps Babel with some new ES6 features like async/await

require('@babel/register')({
	// To transpile ES6 and react
	presets: ['@babel/preset-env', '@babel/preset-react']
});

require('asset-require-hook')({
	// For static files like images
	extensions: ['png'],
	name: '/assets/[name].[ext]'
});

require('./server');
