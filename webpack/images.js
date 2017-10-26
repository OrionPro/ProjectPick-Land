module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.(jpg|png|svg|gif|ico)$/,
					include: paths,
					loader: 'file-loader',
					options: {
						name: 'img/[name].[ext]'
					},
				},
			],
		},
	};
};