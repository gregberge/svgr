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

  it('should transform elements with filter', () => {
    const svg = `
      <svg height="150" width="150">
        <filter id="filter1">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <g filter="url(#filter1)">
          <circle cx="75" cy="50" r="40" fill="blue" fill-opacity="0.5" />
          <circle cx="55" cy="90" r="40" fill="green" fill-opacity="0.5" />
          <circle cx="95" cy="90" r="40" fill="red" fill-opacity="0.5" />
        </g>
      </svg>
    `

    const code = testPlugin(svg)
    expect(code).toMatchInlineSnapshot(`
      "<Svg height="150" width="150">
              <Filter id="filter1">
                <FeGaussianBlur stdDeviation="3" />
              </Filter>
              <G filter="url(#filter1)">
                <Circle cx="75" cy="50" r="40" fill="blue" fill-opacity="0.5" />
                <Circle cx="55" cy="90" r="40" fill="green" fill-opacity="0.5" />
                <Circle cx="95" cy="90" r="40" fill="red" fill-opacity="0.5" />
              </G>
            </Svg>;"
    `)
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

  it('should add version warning', () => {
    const code = testPlugin(
      `import Svg from 'react-native-svg'; <svg> <filter id="filter1"><feGaussianBlur stdDeviation="3" /></filter></svg>;`,
    )
    expect(code).toMatchInlineSnapshot(`
      "import Svg, { Filter, FeGaussianBlur } from 'react-native-svg';
      /* Using svg filters is only supported on react-native-svg v15.5.0 or later. */
      <Svg> <Filter id="filter1"><FeGaussianBlur stdDeviation="3" /></Filter></Svg>;"
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
