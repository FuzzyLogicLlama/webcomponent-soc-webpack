const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/main.js',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.css$/i,
				use: "css-loader"
			},
		],
	},
	// used only to process index.html for showcasing
	// how the web component is used. Not required for
	// bundling the actual component. Convenient because
	// it automatically adds a link tag to our web
	// component JS file.
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
	output: {
		filename: '[name].bundle.js',
     	path: path.resolve(__dirname, 'dist'),
		clean: true,
	}
};
