const path = require('path');
const webpack = require('webpack');
const env = require('./local.env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index'),
    output: {
        path: path.join(__dirname, './build'),
        filename: 'index.js',
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        headers: {
            'Access-Control-Expose-Headers': 'Set-Cookie'
        },
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        noInfo: false,
        publicPath: '/build',
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin(env),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.j|tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    }
};
