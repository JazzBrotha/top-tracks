import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: 'dist',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss?$/,
				loader: 'style-loader!css-loader!sass-loader'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			minify: { collapseWhitespace: true },
			template: './src/index.ejs',
		})
	],

	// node: false,
	// devtool: 'source-map',

	devServer: {
		port: process.env.PORT || 8666,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: false
	}
};
