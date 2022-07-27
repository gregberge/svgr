function template(
    { imports, componentName, props, jsx, exports },
    { tpl }
  ) {
    return tpl`
  // THIS IS A COMMENT
  ${imports}
  export function ${componentName}(${props}) {
    return ${jsx};
  }
  `
  }


  module.exports = template