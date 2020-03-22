import { getProps, getImport, getExport, getInterface } from './util'

function defaultTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports },
) {
  const plugins = ['jsx']
  if (opts.typescript) {
    plugins.push('typescript')
  }
  const typeScriptTpl = template.smart({ plugins })
  return typeScriptTpl.ast`${imports}

${interfaces}

function ${componentName}(${props}) {
  return ${jsx};
}
${exports}
  `
}

const plugin = (api, opts) => ({
  visitor: {
    Program(path) {
      const { types: t } = api
      const template = opts.template || defaultTemplate
      const body = template(api, opts, {
        componentName: t.identifier(opts.state.componentName),
        interfaces: getInterface(api, opts),
        props: getProps(api, opts),
        imports: getImport(api, opts),
        exports: getExport(api, opts),
        jsx: path.node.body[0].expression,
      })
      if (Array.isArray(body)) {
        path.node.body = body
      } else {
        path.node.body = [body]
      }
      path.replaceWith(path.node)
    },
  },
})

export default plugin
