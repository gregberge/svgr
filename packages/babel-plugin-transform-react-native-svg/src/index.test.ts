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
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blurEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="50" fill="green" />
      <circle cx="150" cy="100" r="50" fill="green" filter="url(#blurEffect)" />
    </svg>
  `

  const code = testPlugin(svg)
  expect(code).toMatchInlineSnapshot(`
    "<Svg height={150} width={150}>
      <Filter id=\\"filter1\\">
        <FeGaussianBlur stdDeviation={3} />
      </Filter>
      <G filter=\\"url(#filter1)\\">
        <Circle cx={75} cy={50} r={40} fill=\\"blue\\" fillOpacity={0.5} />
        <Circle cx={55} cy={90} r={40} fill=\\"green\\" fillOpacity={0.5} />
        <Circle cx={95} cy={90} r={40} fill=\\"red\\" fillOpacity={0.5} />
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
