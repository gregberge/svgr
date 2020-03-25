function typeAnnotation(typeAnnotation) {
  return {
    type: 'TypeAnnotation',
    typeAnnotation,
  }
}

function genericTypeAnnotation(id, typeParameters = null) {
  return { type: 'GenericTypeAnnotation', id, typeParameters }
}

function typeParameters(params) {
  return {
    type: 'TypeParameterInstantiation',
    params,
  }
}

function qualifiedTypeIdentifier(qualification, id) {
  return { type: 'QualifiedTypeIdentifier', qualification, id }
}

function intersectionTypeAnnotation(types) {
  return { type: 'IntersectionTypeAnnotation', types }
}

function interfaceDeclaration(id, body) {
  return {
    type: 'InterfaceDeclaration',
    id,
    typeParameters: null,
    extends: [],
    implements: [],
    mixins: [],
    body,
  }
}

function objectTypeAnnotation(properties) {
  return {
    type: 'ObjectTypeAnnotation',
    properties,
  }
}

function objectTypeProperty(key, value, optional = false) {
  return {
    type: 'ObjectTypeProperty',
    key,
    static: false,
    proto: false,
    kind: 'init',
    method: false,
    value,
    variance: null,
    optional,
  }
}

function addTypeAnotation(obj, typeAnnotation, opts) {
  if (!opts.typescript) return obj
  return { ...obj, typeAnnotation }
}

function getSvgPropsTypeAnnotation(t) {
  return genericTypeAnnotation(
    qualifiedTypeIdentifier(t.identifier('React'), t.identifier('SVGProps')),
    typeParameters([genericTypeAnnotation(t.identifier('SVGSVGElement'))]),
  )
}

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
    return addTypeAnotation(
      t.identifier('props'),
      typeAnnotation(getSvgPropsTypeAnnotation(t)),
      opts,
    )
  }

  return addTypeAnotation(
    t.objectPattern(props),
    typeAnnotation(
      opts.expandProps
        ? intersectionTypeAnnotation([
            getSvgPropsTypeAnnotation(t),
            genericTypeAnnotation(t.identifier('SVGRProps')),
          ])
        : genericTypeAnnotation(t.identifier('SVGRProps')),
    ),
    opts,
  )
}

export const getInterface = ({ types: t }, opts) => {
  if (!opts.typescript) return null
  const properties = []
  if (opts.ref) {
    properties.push(
      objectTypeProperty(
        t.identifier('svgRef'),
        genericTypeAnnotation(
          qualifiedTypeIdentifier(t.identifier('React'), t.identifier('Ref')),
          typeParameters([
            genericTypeAnnotation(t.identifier('SVGSVGElement')),
          ]),
        ),
        true,
      ),
    )
  }
  if (opts.titleProp) {
    properties.push(
      objectTypeProperty(t.identifier('title'), t.identifier('string'), true),
    )
    properties.push(
      objectTypeProperty(t.identifier('titleId'), t.identifier('string'), true),
    )
  }
  if (properties.length === 0) return null
  return interfaceDeclaration(
    t.identifier('SVGRProps'),
    objectTypeAnnotation(properties),
  )
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
  const plugins = ['jsx']

  if (opts.typescript) {
    plugins.push('typescript')
  }

  if (opts.memo) {
    const nextExportName = `Memo${exportName}`
    result += `const ${nextExportName} = React.memo(${exportName})\n\n`
    exportName = nextExportName
  }

  if (opts.ref) {
    const nextExportName = `ForwardRef`
    let refType = ''

    if (opts.typescript) {
      refType = ': React.Ref<SVGSVGElement>'
    }

    result += `const ${nextExportName} = React.forwardRef((props, ref${refType}) => <${exportName} svgRef={ref} {...props} />)\n\n`
    exportName = nextExportName
  }

  if (opts.state.caller && opts.state.caller.previousExport) {
    result += `${opts.state.caller.previousExport}\n`
    result += `export { ${exportName} as ReactComponent }`
    return template.ast(result, {
      plugins,
    })
  }

  result += `export default ${exportName}`
  return template.ast(result, {
    plugins,
  })
}
