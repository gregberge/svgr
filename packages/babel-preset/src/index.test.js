/* eslint-disable import/no-extraneous-dependencies */
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
})
