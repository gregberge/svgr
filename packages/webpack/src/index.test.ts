import * as path from 'path'
import { webpack, ModuleOptions } from 'webpack'
// @ts-ignore
import MemoryFs from 'memory-fs'

function compile(rules: ModuleOptions['rules']) {
  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: './__fixtures__/icon.svg',
    output: {
      path: __dirname,
      filename: 'bundle.js',
    },
    module: { rules },
  })

  compiler.outputFileSystem = new MemoryFs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      else {
        resolve(
          stats
            ?.toJson({ source: true })
            ?.modules?.find(({ name }) => name === './__fixtures__/icon.svg')
            ?.source,
        )
      }
    })
  })
}

describe('webpack loader', () => {
  it('transforms file (typescript: true)', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, '..'),
            options: {
              typescript: true,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  })

  it('transforms file', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, '..'),
            options: {
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  })

  it('transforms file', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, '..'),
            options: {
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  })

  it('supports url-loader', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, '..'),
            options: {
              expandProps: false,
            },
          },
          'url-loader',
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  })

  it('transforms file (babel: false)', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-react'],
            },
          },
          {
            loader: path.resolve(__dirname, '..'),
            options: {
              babel: false,
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  })
})
