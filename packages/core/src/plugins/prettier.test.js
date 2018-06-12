import prettier from './prettier'

describe('prettier', () => {
  it('should prettify code', async () => {
    const result = await prettier(`const foo = <div></div>`, { prettier: true })
    expect(result).toBe('const foo = <div />\n')
  })

  it('should support config.prettierConfig', async () => {
    const result = await prettier(`const foo = <div></div>`, {
      prettier: true,
      prettierConfig: { semi: true },
    })
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should use state.filePath to detect configuration', async () => {
    const result = await prettier(
      `const foo = <div></div>`,
      { prettier: true },
      { filePath: '/tmp' },
    )
    expect(result).toBe('const foo = <div />;\n')
  })
})
