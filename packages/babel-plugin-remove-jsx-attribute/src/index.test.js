import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code, options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result.code
}

describe('plugin', () => {
  it('should remove attributes from an element', () => {
    expect(
      testPlugin('<div foo><span foo /></div>', {
        elements: ['span'],
        attributes: ['foo'],
      }),
    ).toMatchInlineSnapshot(`"<div foo><span /></div>;"`)
  })
})
