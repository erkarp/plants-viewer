const path = require('path');
const webpack = require('webpack');
const env = require('./local.env');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index'),
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin(env),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.j|tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            }
        ],
    }
};
