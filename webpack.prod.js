const path = require('path');

module.exports = {
  entry:  [path.join(__dirname, 'src/index'), path.join(__dirname, 'scss/index.scss')],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'index.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: './style.css',
                }
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader?-url' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
