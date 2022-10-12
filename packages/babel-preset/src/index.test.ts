import { transform } from '@babel/core'
import preset, { Options } from '.'

const defaultOptions = {
  namedExport: 'ReactComponent',
  state: { componentName: 'SvgComponent' },
}

const testPreset = (code: string, options: Partial<Options>) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx'],
    presets: [[preset, { ...defaultOptions, ...options }]],
    configFile: false,
  })

  return result?.code
}

describe('preset', () => {
  it('handles svgProps', () => {
    expect(
      testPreset('<svg />', {
        svgProps: {
          foo: 'bar',
          x: '{y}',
        },
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = () => <svg role=\\"img\\" foo=\\"bar\\" x={y} />;

      export default SvgComponent;"
    `)
  })

  it('handles titleProp', () => {
    expect(
      testPreset('<svg></svg>', {
        titleProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        title,
        titleId
      }) => <svg role=\\"img\\" aria-labelledby={titleId}>{title ? <title id={titleId}>{title}</title> : null}</svg>;

      export default SvgComponent;"
    `)
  })
  it('handles titleProp and fallback on existing title', () => {
    // testing when existing title has string as chilren
    expect(
      testPreset(`<svg><title>Hello</title></svg>`, {
        titleProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        title,
        titleId
      }) => <svg role=\\"img\\" aria-labelledby={titleId}>{title === undefined ? <title id={titleId}>Hello</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;

      export default SvgComponent;"
    `)
    // testing when existing title has JSXExpression as children
    expect(
      testPreset(`<svg><title>{"Hello"}</title></svg>`, {
        titleProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        title,
        titleId
      }) => <svg role=\\"img\\" aria-labelledby={titleId}>{title === undefined ? <title id={titleId}>{\\"Hello\\"}</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;

      export default SvgComponent;"
    `)
  })

  it('handles descProp', () => {
    expect(
      testPreset('<svg></svg>', {
        descProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        desc,
        descId
      }) => <svg role=\\"img\\" aria-describedby={descId}>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;

      export default SvgComponent;"
    `)
  })
  it('handles descProp and fallback on existing desc', () => {
    // testing when existing desc has string as chilren
    expect(
      testPreset(`<svg><desc>Hello</desc></svg>`, {
        descProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        desc,
        descId
      }) => <svg role=\\"img\\" aria-describedby={descId}>{desc === undefined ? <desc id={descId}>Hello</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;

      export default SvgComponent;"
    `)
    // testing when existing desc has JSXExpression as children
    expect(
      testPreset(`<svg><desc>{"Hello"}</desc></svg>`, {
        descProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        desc,
        descId
      }) => <svg role=\\"img\\" aria-describedby={descId}>{desc === undefined ? <desc id={descId}>{\\"Hello\\"}</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;

      export default SvgComponent;"
    `)
  })

  it('handles descProp and titleProp', () => {
    expect(
      testPreset('<svg></svg>', {
        titleProp: true,
        descProp: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = ({
        title,
        titleId,
        desc,
        descId
      }) => <svg role=\\"img\\" aria-labelledby={titleId} aria-describedby={descId}>{desc ? <desc id={descId}>{desc}</desc> : null}{title ? <title id={titleId}>{title}</title> : null}</svg>;

      export default SvgComponent;"
    `)
  })

  it('handles replaceAttrValues', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        replaceAttrValues: {
          '#000': 'black',
          '#fff': '{props.white}',
        },
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = () => <svg a=\\"black\\" b={props.white} role=\\"img\\" />;

      export default SvgComponent;"
    `)
  })

  it('handles expandProps & icon & dimensions', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        expandProps: 'end',
        icon: true,
        dimensions: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = props => <svg a=\\"#000\\" b=\\"#fff\\" width=\\"1em\\" height=\\"1em\\" role=\\"img\\" {...props} />;

      export default SvgComponent;"
    `)
  })

  it('handles custom icon size', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        expandProps: 'end',
        icon: 24,
        dimensions: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";

      const SvgComponent = props => <svg a=\\"#000\\" b=\\"#fff\\" width={24} height={24} role=\\"img\\" {...props} />;

      export default SvgComponent;"
    `)
  })

  it('defaults to 24 on native', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        expandProps: 'end',
        icon: true,
        native: true,
        dimensions: true,
      }),
    ).toMatchInlineSnapshot(`
      "import * as React from \\"react\\";
      import Svg from \\"react-native-svg\\";

      const SvgComponent = props => <Svg a=\\"#000\\" b=\\"#fff\\" width={24} height={24} accessibilityRole=\\"image\\" {...props} />;

      export default SvgComponent;"
    `)
  })
})
