import { transform } from '@babel/core'
import preset from '.'

const testPreset = (code, options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx'],
    presets: [[preset, options]],
    configFile: false,
  })

  return result.code
}

describe('preset', () => {
  it('should handle svgProps', () => {
    expect(
      testPreset('<svg />', {
        svgProps: {
          foo: 'bar',
          x: '{y}',
        },
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  
                  const SvgComponent = () => <svg foo=\\"bar\\" x={y} />;
                  
                  export default SvgComponent;"
            `)
  })

  it('should handle native expo option', () => {
    expect(
      testPreset('<svg><g><path d="M0 0h48v1H0z" /></g></svg>', {
        native: { expo: true },
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  import { Svg } from \\"expo\\";
                  
                  const SvgComponent = () => <Svg><Svg.G><Svg.Path d=\\"M0 0h48v1H0z\\" /></Svg.G></Svg>;
                  
                  export default SvgComponent;"
            `)
  })

  it('should handle titleProp', () => {
    expect(
      testPreset('<svg></svg>', {
        titleProp: true,
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  
                  const SvgComponent = ({
                    title
                  }) => <svg><title>{title}</title></svg>;
                  
                  export default SvgComponent;"
            `)
  })
  it('should handle titleProp and fallback on existing title', () => {
    // testing when existing title has string as chilren
    expect(
      testPreset(`<svg><title>Hello</title></svg>`, {
        titleProp: true,
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  
                  const SvgComponent = ({
                    title
                  }) => <svg>{title === undefined ? <title>Hello</title> : <title>{title}</title>}</svg>;
                  
                  export default SvgComponent;"
            `)
    // testing when existing title has JSXExpression as children
    expect(
      testPreset(`<svg><title>{"Hello"}</title></svg>`, {
        titleProp: true,
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  
                  const SvgComponent = ({
                    title
                  }) => <svg>{title === undefined ? <title>{\\"Hello\\"}</title> : <title>{title}</title>}</svg>;
                  
                  export default SvgComponent;"
            `)
  })

  it('should handle replaceAttrValues', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        replaceAttrValues: {
          '#000': 'black',
          '#fff': '{props.white}',
        },
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
                  "import React from \\"react\\";
                  
                  const SvgComponent = () => <svg a=\\"black\\" b={props.white} />;
                  
                  export default SvgComponent;"
            `)
  })

  it('should handle expandProps & icon & dimensions', () => {
    expect(
      testPreset('<svg a="#000" b="#fff" />', {
        expandProps: 'end',
        icon: true,
        dimensions: true,
        state: {
          componentName: 'SvgComponent',
        },
      }),
    ).toMatchInlineSnapshot(`
      "import React from \\"react\\";
      
      const SvgComponent = props => <svg a=\\"#000\\" b=\\"#fff\\" width=\\"1em\\" height=\\"1em\\" {...props} />;
      
      export default SvgComponent;"
    `)
  })
})
