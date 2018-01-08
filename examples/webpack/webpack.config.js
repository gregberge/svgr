const path = require('path')

module.exports = {
  entry: ['./main'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /url\.svg$/,
        use: [
          'babel-loader',
          require.resolve('../../lib/webpack'),
          'url-loader',
        ],
      },
      {
        test: /simple\.svg$/,
        use: ['babel-loader', require.resolve('../../lib/webpack')],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },
}
