require('ignore-styles');

require('@babel/register')({
	presets: ['@babel/preset-env', '@babel/preset-react']
});

require('asset-require-hook')({
	extensions: ['png'],
	name: '/assets/[name].[ext]'
});

require('./server');
