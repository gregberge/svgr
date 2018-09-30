import prettier from './prettier'

describe('prettier', () => {
  it('should prettify code', async () => {
    const result = await prettier(`const foo = <div></div>`, {
      prettier: true,
      runtimeConfig: true,
    })
    expect(result).toBe('const foo = <div />\n')
  })

  it('should support config.prettierConfig', async () => {
    const result = await prettier(`const foo = <div></div>`, {
      prettier: true,
      runtimeConfig: true,
      prettierConfig: { semi: true },
    })
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should use state.filePath to detect configuration', async () => {
    const result = await prettier(
      `const foo = <div></div>`,
      { prettier: true, runtimeConfig: true },
      { filePath: '/tmp' },
    )
    expect(result).toBe('const foo = <div />;\n')
  })

  it('should resolve the prettier config with the editorconfig option', async () => {
    jest.resetModules()
    jest.doMock('prettier')
    /* eslint-disable global-require */
    const prettierPlugin = require('./prettier').default
    const { resolveConfig } = require('prettier')
    /* eslint-enable global-require */

    await prettierPlugin(`const foo = <div></div>`, {
      prettier: true,
      runtimeConfig: true,
    })
    expect(resolveConfig).toHaveBeenCalledWith(expect.any(String), {
      editorconfig: true,
    })
  })

  it('should not load runtime configuration with `runtimeConfig: false`', async () => {
    jest.resetModules()
    jest.doMock('prettier')
    /* eslint-disable global-require */
    const prettierPlugin = require('./prettier').default
    const { resolveConfig } = require('prettier')
    /* eslint-enable global-require */

    await prettierPlugin(`const foo = <div></div>`, {
      prettier: true,
      runtimeConfig: false,
    })
    expect(resolveConfig).not.toHaveBeenCalled()
  })
})
