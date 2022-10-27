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
      "import * as React from \\"react\\";

      const SvgComponent = () => <svg viewBox=\\"0 0 88 88\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlnsXlink=\\"http://www.w3.org/1999/xlink\\"><title>{\\"Dismiss\\"}</title><desc>{\\"Created with Sketch.\\"}</desc><defs /><g id=\\"Blocks\\" stroke=\\"none\\" strokeWidth={1} fill=\\"none\\" fillRule=\\"evenodd\\" strokeLinecap=\\"square\\"><g id=\\"Dismiss\\" stroke=\\"#063855\\" strokeWidth={2}><path d=\\"M51,37 L37,51\\" id=\\"Shape\\" /><path d=\\"M51,51 L37,37\\" id=\\"Shape\\" /></g></g></svg>;

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
      "const SvgComponent = () => <svg viewBox=\\"0 0 88 88\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlnsXlink=\\"http://www.w3.org/1999/xlink\\"><title>{\\"Dismiss\\"}</title><desc>{\\"Created with Sketch.\\"}</desc><defs /><g id=\\"Blocks\\" stroke=\\"none\\" strokeWidth={1} fill=\\"none\\" fillRule=\\"evenodd\\" strokeLinecap=\\"square\\"><g id=\\"Dismiss\\" stroke=\\"#063855\\" strokeWidth={2}><path d=\\"M51,37 L37,51\\" id=\\"Shape\\" /><path d=\\"M51,51 L37,37\\" id=\\"Shape\\" /></g></g></svg>;

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
      "import { h } from \\"preact\\";

      const SvgComponent = () => <svg viewBox=\\"0 0 88 88\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlnsXlink=\\"http://www.w3.org/1999/xlink\\"><title>{\\"Dismiss\\"}</title><desc>{\\"Created with Sketch.\\"}</desc><defs /><g id=\\"Blocks\\" stroke=\\"none\\" strokeWidth={1} fill=\\"none\\" fillRule=\\"evenodd\\" strokeLinecap=\\"square\\"><g id=\\"Dismiss\\" stroke=\\"#063855\\" strokeWidth={2}><path d=\\"M51,37 L37,51\\" id=\\"Shape\\" /><path d=\\"M51,51 L37,37\\" id=\\"Shape\\" /></g></g></svg>;

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
      "import * as React from \\"react\\";

      const SvgComponent = () => <svg viewBox=\\"0 0 88 88\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlnsXlink=\\"http://www.w3.org/1999/xlink\\"><desc>{\\"Created with Sketch.\\"}</desc><defs /><g id=\\"Blocks\\" stroke=\\"none\\" strokeWidth={1} fill=\\"none\\" fillRule=\\"evenodd\\" strokeLinecap=\\"square\\"><g id=\\"Dismiss\\" stroke=\\"#063855\\" strokeWidth={2}><path d=\\"M51,37 L37,51\\" id=\\"Shape\\" /><path d=\\"M51,51 L37,37\\" id=\\"Shape\\" /></g></g></svg>;

      export default SvgComponent;"
    `)
  })
})
