import prettier from './prettier'

describe('prettier', () => {
  it('should prettify code', () => {
    const result = prettier(`const foo = <div></div>`)
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should support options', () => {
    const result = prettier(`const foo = <div></div>`, { semi: false })
    expect(result).toBe('const foo = <div />\n')
  })
})
