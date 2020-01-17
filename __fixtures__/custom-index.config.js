const indexTemplate = require('./custom-index-template.js')

function template(
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) {
  return template.ast`${imports}
export function ${componentName}(${props}) {
  return ${jsx};
}
`
}

module.exports = {
  template,
  indexTemplate,
}
