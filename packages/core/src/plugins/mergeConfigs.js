import mergeWith from 'lodash/mergeWith'

function concatArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }

  return undefined // default value
}

export default (...configs) => mergeWith(...configs, concatArrays)
