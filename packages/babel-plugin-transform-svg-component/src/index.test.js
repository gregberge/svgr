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
  it('should transform whole program', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      state: { componentName: 'SvgComponent' },
    })
    expect(code).toMatchInlineSnapshot(`
"import React from \\"react\\";

const SvgComponent = () => <svg><div /></svg>;

export default SvgComponent;"
`)
  })

  it('should support custom template', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      template: (
        { template },
        opts,
        { jsx },
      ) => template.ast`import React from 'react';
  const MyComponent = () => ${jsx}
  export default MyComponent
`,
      state: { componentName: 'SvgComponent' },
    })
    expect(code).toMatchInlineSnapshot(`
"import React from 'react';

const MyComponent = () => <svg><div /></svg>;

export default MyComponent;"
`)
  })

  it('should work with ref', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      state: { componentName: 'SvgComponent' },
      ref: true,
    })
    expect(code).toMatchInlineSnapshot(`
"import React from \\"react\\";

const SvgComponent = ({
  svgRef
}) => <svg><div /></svg>;

const ForwardRef = React.forwardRef((props, ref) => <SvgComponent svgRef={ref} {...props} />);
export default ForwardRef;"
`)
  })
})
