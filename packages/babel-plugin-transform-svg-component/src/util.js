export const getProps = ({ types: t }, opts) => {
  const props = []

  if (opts.ref) {
    props.push(
      t.objectProperty(
        t.identifier('svgRef'),
        t.identifier('svgRef'),
        false,
        true,
      ),
    )
  }

  if (opts.titleProp) {
    props.push(
      t.objectProperty(
        t.identifier('title'),
        t.identifier('title'),
        false,
        true,
      ),
    )

    props.push(
      t.objectProperty(
        t.identifier('titleId'),
        t.identifier('titleId'),
        false,
        true,
      ),
    )
  }

  if (opts.expandProps) {
    props.push(t.restElement(t.identifier('props')))
  }

  if (props.length === 0) {
    return null
  }

  if (props.length === 1 && opts.expandProps) {
    return t.identifier('props')
  }

  return t.objectPattern(props)
}

export const getImport = ({ types: t }, opts) => {
  const importDeclarations = [
    t.importDeclaration(
      [t.importNamespaceSpecifier(t.identifier('React'))],
      t.stringLiteral('react'),
    ),
  ]

  if (opts.native) {
    if (opts.native.expo) {
      importDeclarations.push(t.importDeclaration([], t.stringLiteral('expo')))
    } else {
      importDeclarations.push(
        t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier('Svg'))],
          t.stringLiteral('react-native-svg'),
        ),
      )
    }
  }

  return importDeclarations
}

export const getExport = ({ template }, opts) => {
  let result = ''
  let exportName = opts.state.componentName

  if (opts.memo) {
    const nextExportName = `Memo${exportName}`
    result += `const ${nextExportName} = React.memo(${exportName})\n\n`
    exportName = nextExportName
  }

  if (opts.ref) {
    const nextExportName = `ForwardRef`
    result += `const ${nextExportName} = React.forwardRef((props, ref) => <${exportName} svgRef={ref} {...props} />)\n\n`
    exportName = nextExportName
  }

  if (opts.state.caller && opts.state.caller.previousExport) {
    result += `${opts.state.caller.previousExport}\n`
    result += `export { ${exportName} as ReactComponent }`
    return template.ast(result, {
      plugins: ['jsx'],
    })
  }

  result += `export default ${exportName}`
  return template.ast(result, {
    plugins: ['jsx'],
  })
}
