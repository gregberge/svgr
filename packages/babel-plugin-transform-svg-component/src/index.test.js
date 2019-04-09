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

  it('should add import for react-native-svg', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      state: { componentName: 'SvgComponent' },
      native: true,
    })
    expect(code).toMatchInlineSnapshot(`
"import React from \\"react\\";
import Svg from \\"react-native-svg\\";

const SvgComponent = () => <svg><div /></svg>;

export default SvgComponent;"
`)
  })

  it('should import for expo', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      state: { componentName: 'SvgComponent' },
      native: { expo: true },
    })
    expect(code).toMatchInlineSnapshot(`
"import React from \\"react\\";
import \\"expo\\";

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

  it('should support custom typescript template', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      template: ({ template }, opts, { jsx }) => {
        const typescriptTemplate = template.smart({ plugins: ['typescript'] })
        return typescriptTemplate.ast`
          import * as React from 'react';
          const MyComponent = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
          export default MyComponent;
        `
      },
      state: { componentName: 'SvgComponent' },
    })
    expect(code).toMatchInlineSnapshot(`
"import * as React from 'react';

const MyComponent = (props: React.SVGProps<SVGSVGElement>) => <svg><div /></svg>;

export default MyComponent;"
`)
  })

  it('should handle template that does not return an array', () => {
    const { code } = testPlugin('<svg><div /></svg>', {
      template: ({ template }, opts, { jsx }) => template.ast`${jsx}`,
      state: { componentName: 'SvgComponent' },
    })
    expect(code).toMatchInlineSnapshot(`"<svg><div /></svg>;"`)
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
