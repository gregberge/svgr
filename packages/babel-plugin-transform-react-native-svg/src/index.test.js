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
      `import Svg from 'react-native-svg'; <svg><g /><div /></svg>;`,
    )
    expect(code).toMatchInlineSnapshot(`
"import Svg, { G } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: div */

<Svg><G /></Svg>;"
`)
  })
})
