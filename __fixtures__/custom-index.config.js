const path = require('path')

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

function indexTemplate(files) {
  const exportEntries = files.map(file => {
    const basename = path.basename(file, path.extname(file))
    return `export { ${basename} } from './${basename}'`
  })
  return exportEntries.join('\n')
}

module.exports = {
  template,
  indexTemplate,
}
