const SpritesmithPlugin = require('webpack-spritesmith');
const path = require('path');

module.exports = function() {
	return {
		resolve: {
			modules: ["node_modules", "spritesmith"]
		},
		plugins: [
			new SpritesmithPlugin({
				src: {
					cwd: path.resolve(__dirname, '../source/img/sprite'),
					glob: '*.png'
				},
				target: {
					image: path.resolve(__dirname, '../source/spritesmith/sprite.png'),
					css: path.resolve(__dirname, '../source/sass/sprite.sass')
				},
				apiOptions: {
					cssImageRef: "~sprite/sprite.png"
				},
				spritesmithOptions: {
					padding: 2
				},
				spritesmithConfig: {
					algorithm: 'binary-tree'
				}
			})
		]
	};
};