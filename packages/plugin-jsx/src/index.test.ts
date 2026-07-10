import jsx from '.'

const svgBaseCode = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Dismiss</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
        <g id="Dismiss" stroke="#063855" stroke-width="2">
            <path d="M51,37 L37,51" id="Shape"></path>
            <path d="M51,51 L37,37" id="Shape"></path>
        </g>
    </g>
</svg>
`

describe('plugin', () => {
  it('transforms code', () => {
    const result = jsx(svgBaseCode, {}, { componentName: 'SvgComponent' })
    expect(result).toMatchInlineSnapshot(`
      "import * as React from "react";
      const SvgComponent = () => <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title>{"Dismiss"}</title><desc>{"Created with Sketch."}</desc><defs /><g id="Blocks" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="square"><g id="Dismiss" stroke="#063855" strokeWidth={2}><path d="M51,37 L37,51" id="Shape" /><path d="M51,51 L37,37" id="Shape" /></g></g></svg>;
      export default SvgComponent;"
    `)
  })

  it('supports "automatic" runtime', () => {
    const result = jsx(
      svgBaseCode,
      { jsxRuntime: 'automatic' },
      { componentName: 'SvgComponent' },
    )
    expect(result).toMatchInlineSnapshot(`
      "const SvgComponent = () => <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title>{"Dismiss"}</title><desc>{"Created with Sketch."}</desc><defs /><g id="Blocks" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="square"><g id="Dismiss" stroke="#063855" strokeWidth={2}><path d="M51,37 L37,51" id="Shape" /><path d="M51,51 L37,37" id="Shape" /></g></g></svg>;
      export default SvgComponent;"
    `)
  })

  it('supports "preact" preset', () => {
    const result = jsx(
      svgBaseCode,
      { jsxRuntime: 'classic-preact' },
      { componentName: 'SvgComponent' },
    )
    expect(result).toMatchInlineSnapshot(`
      "import { h } from "preact";
      const SvgComponent = () => <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><title>{"Dismiss"}</title><desc>{"Created with Sketch."}</desc><defs /><g id="Blocks" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="square"><g id="Dismiss" stroke="#063855" strokeWidth={2}><path d="M51,37 L37,51" id="Shape" /><path d="M51,51 L37,37" id="Shape" /></g></g></svg>;
      export default SvgComponent;"
    `)
  })

  it('accepts jsx config', () => {
    const dropTitle = () => ({
      visitor: {
        JSXElement(path: any) {
          if (
            path.get('openingElement.name').isJSXIdentifier({ name: 'title' })
          ) {
            path.remove()
          }
        },
      },
    })

    const result = jsx(
      svgBaseCode,
      { jsx: { babelConfig: { plugins: [dropTitle] } } },
      { componentName: 'SvgComponent' },
    )
    expect(result).toMatchInlineSnapshot(`
      "import * as React from "react";
      const SvgComponent = () => <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><desc>{"Created with Sketch."}</desc><defs /><g id="Blocks" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="square"><g id="Dismiss" stroke="#063855" strokeWidth={2}><path d="M51,37 L37,51" id="Shape" /><path d="M51,51 L37,37" id="Shape" /></g></g></svg>;
      export default SvgComponent;"
    `)
  })

  it('supports runtime unique ids', () => {
    const result = jsx(
      `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="prefix__a"><path /></clipPath>
          <linearGradient id="prefix__b"><stop /></linearGradient>
          <g id="fff" />
        </defs>
        <g clip-path="url(#prefix__a)">
          <path fill="url('#prefix__b')" style="filter:url(#prefix__a);color:#fff" />
          <use xlink:href="#prefix__a" />
          <a href="https://example.test/#prefix__a"><path /></a>
        </g>
      </svg>
      `,
      { runtimeIds: true },
      { componentName: 'SvgComponent' },
    )
    expect(result).toContain('React.useId()')
    expect(result).toContain('_getSvgId("prefix__a")')
    expect(result).toContain('_getSvgId("prefix__b")')
    expect(result).toContain('filter: "url(#" + _getSvgId("prefix__a") + ")"')
    expect(result).toContain('xlinkHref={"#" + _getSvgId("prefix__a")}')
    expect(result).toContain('color: "#fff"')
    expect(result).toContain('href="https://example.test/#prefix__a"')
    expect(result).not.toContain('id="prefix__a"')
    expect(result).not.toContain('id="prefix__b"')
    expect(result).not.toContain('url(#prefix__a)')
    expect(result).not.toContain("url('#prefix__b')")
  })

  it('supports runtime unique ids with typescript', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      { runtimeIds: true, typescript: true },
      { componentName: 'SvgComponent' },
    )

    expect(result).toContain('const _getSvgId = (id: string) =>')
  })

  it('supports runtime unique ids with preact', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      { jsxRuntime: 'classic-preact', runtimeIds: true },
      { componentName: 'SvgComponent' },
    )

    expect(result).toContain('import { useId as _useId } from "preact/hooks"')
    expect(result).toContain('_useId()')
  })

  it('supports a custom useId import source', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      { runtimeIds: { importSource: 'custom-runtime/hooks' } },
      { componentName: 'SvgComponent' },
    )

    expect(result).toContain(
      'import { useId as _useId } from "custom-runtime/hooks"',
    )
  })

  it('supports runtime unique ids with automatic runtime', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      { jsxRuntime: 'automatic', runtimeIds: true },
      { componentName: 'SvgComponent' },
    )
    expect(result).toMatchInlineSnapshot(`
      "import { useId as _useId } from "react";
      const SvgComponent = () => {
        const _svgId = _useId().replace(/[^A-Za-z0-9_-]/g, "_");
        const _getSvgId = id => \`\${_svgId}-\${id}\`;
        return <svg><mask id={_getSvgId("prefix__a")} /><path mask={"url(#" + _getSvgId("prefix__a") + ")"} /></svg>;
      };
      export default SvgComponent;"
    `)
  })

  it('supports runtime unique ids with ref and memo', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      { jsxRuntime: 'automatic', runtimeIds: true, ref: true, memo: true },
      { componentName: 'SvgComponent' },
    )

    expect(result).toContain(
      'import { forwardRef, memo, useId as _useId } from "react"',
    )
    expect(result).toContain('const SvgComponent = (_, ref) => {')
    expect(result).toContain('const _svgId = _useId()')
    expect(result).toContain('const ForwardRef = forwardRef(SvgComponent)')
    expect(result).toContain('const Memo = memo(ForwardRef)')
  })

  it('does not add a hook when the svg has no ids', () => {
    const result = jsx(
      `<svg><path fill="#fff" /></svg>`,
      { runtimeIds: true },
      { componentName: 'SvgComponent' },
    )

    expect(result).not.toContain('useId')
  })

  it('does not rewrite runtime ids when a custom template has no component function', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      {
        runtimeIds: true,
        template: ({ jsx }, { tpl }) => tpl`${jsx}`,
      },
      { componentName: 'SvgComponent' },
    )

    expect(result).toMatchInlineSnapshot(
      `"<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>;"`,
    )
  })

  it('does not inject a hook into a custom class component', () => {
    const result = jsx(
      `<svg><mask id="prefix__a" /><path mask="url(#prefix__a)" /></svg>`,
      {
        runtimeIds: true,
        template: ({ componentName, exports, imports, jsx }, { tpl }) => tpl`
          ${imports}
          class ${componentName} extends React.Component {
            render() {
              return ${jsx}
            }
          }
          ${exports}
        `,
      },
      { componentName: 'SvgComponent' },
    )

    expect(result).not.toContain('useId')
    expect(result).toContain('id="prefix__a"')
    expect(result).toContain('mask="url(#prefix__a)"')
  })
})
