const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const fonts = require('./webpack/fonts');
const js = require('./webpack/js');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const sprite = require('./webpack/sprite');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			'blog': PATHS.source + '/pages/blog/blog.js'
		},
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		externals: {
			'jquery-mousewheel': 'jquery-mousewheel',
			'../TweenLite': 'TweenLite',
		},
		resolve: {
			modules: ["node_modules", "source"],
			alias: {
				'sprite': path.resolve(__dirname, 'source/spritesmith/'),
				'img': path.resolve(__dirname, 'source/img/'),
				'fonts': path.resolve(__dirname, 'source/fonts/'),
				'sass': path.resolve(__dirname, 'source/sass/')
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.source + '/pages/index/index.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'blog.html',
				chunks: ['blog', 'common'],
				template: PATHS.source + '/pages/blog/blog.pug'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	},
	pug(),
	sprite(),
	images(),
	fonts()
]);

module.exports = function(env) {
	if (env === 'production'){
		return merge([
			common,
			extractCSS(),
			uglifyJS(),
			js()
		]);
	}
	if (env === 'development'){
		return merge([
			common,
			js(),
			css(),
			sass(),
			devserver()
		]);
	}
};










