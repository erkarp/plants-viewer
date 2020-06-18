const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HtmlWebpackPlugin } = require('html-webpack-plugin');

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
        // port: 3000,
        host: 'localhost',
        // historyApiFallback: true,
        noInfo: false,
        // stats: 'minimal',
        // contentBase: '.',
        publicPath: '/build',
        // contentBase: path.join(__dirname, publicPath),
        hot: true
    },
    plugins: [
        // new BundleTracker({
        //     path: __dirname,
        //     filename: 'webpack-stats.json'
        // }),
        // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        // new HtmlWebpackPlugin()
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
