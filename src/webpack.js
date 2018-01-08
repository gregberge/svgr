import { getOptions } from 'loader-utils'
import convert from './'

function svgrLoader(source) {
  const callback = this.async()
  const options = getOptions(this) || {}

  const readSvg = () =>
    new Promise((resolve, reject) => {
      this.fs.readFile(this.resourcePath, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })

  const exportMatches = source.match(/^module.exports\s*=\s*(.*)/)
  const previousExport = exportMatches ? exportMatches[1] : null

  readSvg()
    .then(svg => convert(svg, options, { webpack: { previousExport } }))
    .then(result => callback(null, result))
    .catch(err => callback(err))
}

function svgrLoaderWithWarning(source) {
  /* eslint-disable no-console */
  console.warn(
    'Using "svgr/lib/webpack" is deprecated and will be removed in v2. Please use "svgr/webpack" instead.',
  )
  /* eslint-enable no-console */
  return svgrLoader.call(this, source)
}

export { svgrLoader }
export default svgrLoaderWithWarning
