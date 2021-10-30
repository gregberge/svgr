import { transform } from '@babel/core'
import plugin, { Options } from '.'

const testPlugin = (code: string, options: Options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result?.code
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

  it('should not throw error when spread operator is used', () => {
    expect(
      testPlugin('<div foo><span foo {...props} /></div>', {
        elements: ['span'],
        attributes: ['foo'],
      }),
    ).toMatchInlineSnapshot(`"<div foo><span {...props} /></div>;"`)
  })
})
