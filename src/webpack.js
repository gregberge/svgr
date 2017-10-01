import loaderUtils from 'loader-utils'
import convert from './'

function svgrLoader(source) {
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}
  convert(source, options)
    .then(result => callback(null, result))
    .catch(err => callback(err))
}

export default svgrLoader
