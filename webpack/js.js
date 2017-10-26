module.exports = function(paths) {
    return {
		module: {
			rules: [
				{
					test: /\.js$/,
					include: paths,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react', "stage-3"]
						}
					}
				}
			]
		}
    };
};