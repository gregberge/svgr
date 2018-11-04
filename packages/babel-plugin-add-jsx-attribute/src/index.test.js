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
  it('should add simple attribute', () => {
    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'disabled' }],
      }),
    ).toMatchInlineSnapshot(`"<div disabled />;"`)
  })

  it('should add attribute with value', () => {
    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'disabled', value: true }],
      }),
    ).toMatchInlineSnapshot(`"<div disabled={true} />;"`)
    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'disabled', value: 'true' }],
      }),
    ).toMatchInlineSnapshot(`"<div disabled=\\"true\\" />;"`)

    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'disabled', value: 200 }],
      }),
    ).toMatchInlineSnapshot(`"<div disabled={200} />;"`)
  })

  it('should add literal attribute', () => {
    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'ref', value: 'ref', literal: true }],
      }),
    ).toMatchInlineSnapshot(`"<div ref={ref} />;"`)

    expect(
      testPlugin('<div />', {
        elements: ['div'],
        attributes: [{ name: 'ref', value: 'ref ? ref : null', literal: true }],
      }),
    ).toMatchInlineSnapshot(`"<div ref={ref ? ref : null} />;"`)
  })

  it('should add spread attribute', () => {
    expect(
      testPlugin('<div foo><span /></div>', {
        elements: ['div'],
        attributes: [
          {
            spread: true,
            name: 'props',
            position: 'start',
          },
        ],
      }),
    ).toMatchInlineSnapshot(`"<div {...props} foo><span /></div>;"`)

    expect(
      testPlugin('<div><span foo="bar" /></div>', {
        elements: ['span'],
        attributes: [
          {
            spread: true,
            name: 'props',
            position: 'end',
          },
        ],
      }),
    ).toMatchInlineSnapshot(`"<div><span foo=\\"bar\\" {...props} /></div>;"`)
  })

  it('should replace attribute', () => {
    expect(
      testPlugin('<div disabled />', {
        elements: ['div'],
        attributes: [{ name: 'disabled', value: false }],
      }),
    ).toMatchInlineSnapshot(`"<div disabled={false} />;"`)
  })
})
