const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
	devtool: 'source-map',
	entry: {
		filename: './src/app.js'
	},
	output: {
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		// uglify js
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				compress: { warnings: false },
				output: { comments: false }
			}
		}),
		// env plugin
		new webpack.DefinePlugin({
			'proccess.env': { NODE_ENV: JSON.stringify(nodeEnv)}
		})
    ],
    resolve: {
	    alias: {
	       handlebars: 'handlebars/dist/handlebars.min.js'
	    }
	}
};