import { getOptions } from 'loader-utils'
import { transform as babelTransform } from '@babel/core'
import convert from '@svgr/core'

function svgrLoader(source) {
  const callback = this.async()
  const { babel = true, ...options } = getOptions(this) || {}

  const readSvg = () =>
    new Promise((resolve, reject) => {
      this.fs.readFile(this.resourcePath, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })

  const exportMatches = source
    .toString('utf-8')
    .match(/^module.exports\s*=\s*(.*)/)
  const previousExport = exportMatches
    ? `export default ${exportMatches[1]}`
    : null

  const pBabelTransform = async jsCode =>
    new Promise((resolve, reject) => {
      babelTransform(
        jsCode,
        {
          babelrc: false,
          // Unless having this, babel will merge the config with global 'babel.config.js' which may causes some problems such as using react-hot-loader/babel in babel.config.js
          configFile: false,
          presets: [
            '@babel/preset-react',
            ['@babel/preset-env', { modules: false }],
          ],
          plugins: ['@babel/plugin-transform-react-constant-elements'],
        },
        (err, result) => {
          if (err) reject(err)
          else resolve(result.code)
        },
      )
    })

  const tranformSvg = svg =>
    convert(svg, options, {
      caller: {
        name: '@svgr/webpack',
        previousExport,
        defaultPlugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      },
      filePath: this.resourcePath,
    })
      .then(jsCode => (babel ? pBabelTransform(jsCode) : jsCode))
      .then(result => callback(null, result))
      .catch(err => callback(err))

  if (exportMatches) {
    readSvg().then(tranformSvg)
  } else {
    tranformSvg(source)
  }
}

export default svgrLoader
