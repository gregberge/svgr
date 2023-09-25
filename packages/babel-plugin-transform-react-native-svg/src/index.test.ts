import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code: string) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', plugin],
    configFile: false,
  })

  return result?.code
}

describe('plugin', () => {
  it('should transform elements', () => {
    const code = testPlugin('<svg><div /></svg>')
    expect(code).toMatchInlineSnapshot(`"<Svg></Svg>;"`)
  })

  it('should add import', () => {
    const code = testPlugin(
      `import Svg from 'react-native-svg'; <svg><g /><div /></svg>;`,
    )
    expect(code).toMatchInlineSnapshot(`
      "import Svg, { G } from 'react-native-svg';
      /* SVGR has dropped some elements not supported by react-native-svg: div */
      <Svg><G /></Svg>;"
    `)
  })

  it('should add deal with type imports properly', () => {
    const code = transform(
      `
      import Svg from 'react-native-svg';
      import type { SvgProps } from "react-native-svg";

      const ComponentSvg = () => <svg><g /></svg>;
    `,
      {
        plugins: [
          '@babel/plugin-syntax-jsx',
          ['@babel/plugin-syntax-typescript', { isTSX: true }],
          plugin,
        ],
        configFile: false,
      },
    )?.code

    expect(code).toMatchInlineSnapshot(`
      "import Svg, { G } from 'react-native-svg';
      import type { SvgProps } from "react-native-svg";
      const ComponentSvg = () => <Svg><G /></Svg>;"
    `)
  })
})
