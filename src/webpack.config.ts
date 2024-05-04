const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							name: "images/[name].[ext]",
						},
					},
				],
			},
		],
	},
};

export {};
