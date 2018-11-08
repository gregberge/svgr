import unified from 'unified'
import parse from 'rehype-parse'
import vfile from 'vfile'
import generate from '@babel/generator'
import hastToBabelAst from './index'

function transform(code) {
  const hastTree = unified()
    .use(parse, {
      fragment: true,
      space: 'svg',
      emitParseErrors: true,
      duplicateAttribute: false,
    })
    .parse(vfile({ path: 'test.svg', contents: code }))

  const babelTree = hastToBabelAst(hastTree)

  const { code: generatedCode } = generate(babelTree)

  return generatedCode
}

describe('hast-util-to-babel-ast', () => {
  it('should correctly transform svg', () => {
    const code = `
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
    expect(transform(code)).toMatchSnapshot()
  })

  it('should correctly transform aria-x', () => {
    const code = `<svg aria-hidden="true"></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg aria-hidden=\\"true\\" />;"`,
    )
  })

  it('should correctly transform data-x', () => {
    const code = `<svg data-hidden="true"></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg data-hidden=\\"true\\" />;"`,
    )
  })
})
