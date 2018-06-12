import reactDomTemplate from '../templates/reactDomTemplate'
import reactNativeTemplate from '../templates/reactNativeTemplate'

export default (code, config, state) => {
  let transform = reactDomTemplate
  if (config.native) transform = reactNativeTemplate
  if (config.template) transform = config.template
  return transform(code, config, state)
}
