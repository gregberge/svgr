const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
}
