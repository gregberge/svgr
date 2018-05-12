import prettier from './prettier'

describe('prettier', () => {
  it('should prettify code', async () => {
    const result = await prettier(`const foo = <div></div>`)
    expect(result).toBe('const foo = <div />\n')
  })

  it('should support options', async () => {
    const result = await prettier(`const foo = <div></div>`, { semi: true })
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should use state.filePath to detect configuration', async () => {
    const result = await prettier(
      `const foo = <div></div>`,
      {},
      { filePath: '/tmp' },
    )
    expect(result).toBe('const foo = <div />;\n')
  })
})
