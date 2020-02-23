module.exports = () => (code, state) => `
import * as React from 'react'

export default function ${state.componentName}() {
  return ${code}
}
`
