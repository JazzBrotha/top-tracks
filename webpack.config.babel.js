import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const file = name => path.resolve(__dirname, name);

module.exports = {
	// context: file('src/js'),
	entry: './src/js/app.js',
	output: {
		// path: file('build'),
		// publicPath: '/',
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
			// template: path.join(__dirname, 'src', 'index.html'),
			template: './src/index.ejs',
			// filename: './index.html'
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
