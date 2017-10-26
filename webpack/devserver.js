const path = require('path');
module.exports = function () {
	return {
		devServer: {
			contentBase: path.join(__dirname, "source"),
			stats: 'errors-only',
			port: 9000,
			inline: true,
			hot: true
		}
	}
};



