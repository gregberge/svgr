import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code, options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result
}

describe('plugin', () => {
  it('should transform elements', () => {
    const { code } = testPlugin('<svg><div /></svg>')
    expect(code).toMatchInlineSnapshot(`"<Svg></Svg>;"`)
  })

  it('should add import', () => {
    const { code } = testPlugin(
      `import Svg from 'react-sketchapp'; <svg><g /><div /></svg>;`,
    )
    expect(code).toMatchInlineSnapshot(`
"import Svg, { G } from 'react-sketchapp';
/* SVGR has dropped some elements not supported by react-sketchapp: div */

<Svg><G /></Svg>;"
`)
  })

  it('should transform for expo import', () => {
    const { code } = testPlugin(`import 'expo'; <svg><g /><div /></svg>;`, {
      expo: true,
    })

    expect(code).toMatchInlineSnapshot(`
"import { Svg } from 'expo';
/* SVGR has dropped some elements not supported by react-sketchapp: div */

<Svg><Svg.G /></Svg>;"
`)
  })
})
