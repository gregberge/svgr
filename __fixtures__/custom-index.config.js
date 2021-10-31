const indexTemplate = require('./custom-index-template.js')

function template(
  { imports, componentName, props, jsx, exports },
  { tpl }
) {
  return tpl`${imports}
export function ${componentName}(${props}) {
  return ${jsx};
}
`
}

module.exports = {
  template,
  indexTemplate,
}
