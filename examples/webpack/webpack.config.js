const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./main'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /url\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /simple\.svg$/,
        use: '@svgr/webpack',
      },
    ],
  },
}
