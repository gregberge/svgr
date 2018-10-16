import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code, options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
  })

  return result.code
}

describe('plugin', () => {
  it('should remove attribute', () => {
    expect(testPlugin('<div foo bar />', { attribute: 'foo' }))
      .toMatchInlineSnapshot(`
"\\"use strict\\";

<div bar />;"
`)

    expect(testPlugin('<div foo bar />', { attribute: 'bar' }))
      .toMatchInlineSnapshot(`
"\\"use strict\\";

<div foo />;"
`)
  })
})
