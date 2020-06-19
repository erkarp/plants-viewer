const path = require('path');
const webpack = require('webpack');
const env = require('./local.env');

module.exports = {
    entry:  [path.join(__dirname, 'src/index'), path.join(__dirname, 'scss/index.scss')],
    output: {
        path: path.join(__dirname, './build'),
        filename: 'index.js',
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        publicPath: '/build',
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin(env),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './style.css'
                        }
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader?-url' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    }
};
