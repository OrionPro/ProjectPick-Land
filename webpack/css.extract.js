const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.sass$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: ['css-loader?minimize=true','postcss-loader','sass-loader'],
					}),
				},
				{
					test: /\.css$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: ['css-loader?minimize=true','postcss-loader'],
					}),
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('./css/[name].css'),
		],
	};
};