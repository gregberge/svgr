import path from 'path'
import webpack from 'webpack'

describe('webpack loader', () => {
  it('should convert file', () =>
    new Promise((resolve, reject) => {
      webpack(
        {
          entry: path.resolve(__dirname, '__fixtures__/main.js'),
          output: {
            path: path.resolve(__dirname, '__fixtures__/dist'),
          },
          module: {
            rules: [
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        [
                          'env',
                          {
                            targets: {
                              node: '6',
                            },
                          },
                        ],
                        'react',
                      ],
                      plugins: [
                        'transform-class-properties',
                        'transform-object-rest-spread',
                      ],
                    },
                  },
                  {
                    loader: path.resolve(__dirname, 'webpack.js'),
                    options: {
                      expandProps: false,
                    },
                  },
                ],
              },
            ],
          },
        },
        (err, stats) => {
          if (err || stats.hasErrors()) reject(err)
          /* eslint-disable global-require, import/no-dynamic-require */
          require(path.resolve(__dirname, '__fixtures__/dist/main.js'))
          /* eslint-enable global-require, import/no-dynamic-require */
          expect(global.exported_icon.name).toBe('SvgComponent')
          resolve()
        },
      )
    }))
})
