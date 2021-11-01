const path = require('path')

function indexTemplate(files) {
  const exportEntries = files.map(file => {
    const basename = path.basename(file, path.extname(file))
    return `export { ${basename} } from './${basename}';`
  })
  return exportEntries.join('\n')
}

module.exports = indexTemplate
