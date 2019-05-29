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
  it('should add title attribute if not present', () => {
    expect(testPlugin('<svg></svg>')).toMatchInlineSnapshot(
      `"<svg><title>{title}</title></svg>;"`,
    )
  })

  it('should add title element and fallback to existing title', () => {
    ;['Hello', '{Hello}']
      .map(titleChildren => `<title>${titleChildren}</title>`)
      .forEach(existingTitleElement =>
        expect(
          testPlugin(`<svg>${existingTitleElement}</svg>`),
        ).toMatchInlineSnapshot(
          `"<svg>{title === undefined ? ${existingTitleElement} : <title>{title}</title>}</svg>;"`,
        ),
      )
  })
  it('should support empty title', () => {
    expect(testPlugin('<svg><title></title></svg>')).toMatchInlineSnapshot(
      `"<svg><title>{title}</title></svg>;"`,
    )
  })
  it('should support self closing title', () => {
    expect(testPlugin('<svg><title /></svg>')).toMatchInlineSnapshot(
      `"<svg><title>{title}</title></svg>;"`,
    )
  })

  it('should work if an attribute is already present', () => {
    expect(testPlugin('<svg><foo /></svg>')).toMatchInlineSnapshot(
      `"<svg><title>{title}</title><foo /></svg>;"`,
    )
  })
})
