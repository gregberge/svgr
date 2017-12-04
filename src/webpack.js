import loaderUtils from 'loader-utils'
import convert from './'

function svgrLoader(source) {
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}
  convert(source, options)
    .then(result => callback(null, result))
    .catch(err => callback(err))
}

function svgrLoaderWithWarning(source) {
  console.warn(
    'Using "svgr/lib/webpack" is deprecated and will be removed in v2. Please use "svgr/webpack" instead.',
  )
  return svgrLoader.call(this, source)
}

export { svgrLoader }
export default svgrLoaderWithWarning
