import prettier from './prettier'

describe('prettier', () => {
  it('should prettify code', () => {
    const result = prettier(`const foo = <div></div>`, { parser: 'babylon' })
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should support options', () => {
    const result = prettier(`const foo = <div></div>`, { semi: false, parser: 'babylon' })
    expect(result).toBe('const foo = <div />\n')
  })
})
