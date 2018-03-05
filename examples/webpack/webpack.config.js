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
        use: [require.resolve('../../webpack'), 'url-loader'],
      },
      {
        test: /simple\.svg$/,
        use: [require.resolve('../../webpack')],
      },
    ],
  },
}
