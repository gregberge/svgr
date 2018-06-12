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
  const previousExport = exportMatches ? exportMatches[1] : null

  const pBabelTransform = async jsCode =>
    new Promise((resolve, reject) => {
      babelTransform(
        jsCode,
        {
          babelrc: false,
          presets: [
            '@babel/preset-react',
            ['@babel/preset-env', { modules: false }],
          ],
          plugins: [
            '@babel/plugin-transform-react-constant-elements',
            '@babel/plugin-proposal-object-rest-spread',
          ],
        },
        (err, result) => {
          if (err) reject(err)
          else resolve(result.code)
        },
      )
    })

  readSvg()
    .then(svg => convert(svg, options, { webpack: { previousExport } }))
    .then(jsCode => (babel ? pBabelTransform(jsCode) : jsCode))
    .then(result => callback(null, result))
    .catch(err => callback(err))
}

export default svgrLoader
