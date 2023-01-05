import { transform } from '@babel/core'
import plugin, { getValueWithProps, Options } from '.'

const testPlugin = (code: string, options: Options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result?.code
}

describe('id plugin', () => {
  it('getValueWithProps should return value', () => {
    expect(
      getValueWithProps('test', {
        prefix: false,
        suffix: false,
      }),
    ).toMatchInlineSnapshot(`"test"`)
  })

  it('getValueWithProps should prefix value', () => {
    expect(
      getValueWithProps('test', {
        prefix: true,
        suffix: false,
      }),
    ).toMatchInlineSnapshot(`"\${props.prefix}test"`)
  })

  it('getValueWithProps should suffix value', () => {
    expect(
      getValueWithProps('test', {
        prefix: false,
        suffix: true,
      }),
    ).toMatchInlineSnapshot(`"test\${props.suffix}"`)
  })

  it('getValueWithProps should prefix and suffix value', () => {
    expect(
      getValueWithProps('test', {
        prefix: true,
        suffix: true,
      }),
    ).toMatchInlineSnapshot(`"\${props.prefix}test\${props.suffix}"`)
  })

  it('should not prefix id', () => {
    expect(
      testPlugin('<svg id="test"></svg>', {
        prefix: false,
        suffix: false,
      }),
    ).toMatchInlineSnapshot(`"<svg id="test"></svg>;"`)
  })

  it('should prefix svg', () => {
    expect(
      testPlugin('<svg id="test"></svg>', {
        prefix: true,
      }),
    ).toMatchInlineSnapshot(`"<svg id={\`\${props.prefix}test\`}></svg>;"`)
  })

  it('should suffix svg', () => {
    expect(
      testPlugin('<svg id="test"></svg>', {
        suffix: true,
      }),
    ).toMatchInlineSnapshot(`"<svg id={\`test\${props.suffix}\`}></svg>;"`)
  })

  it('should prefix and suffix svg', () => {
    expect(
      testPlugin('<svg id="test"></svg>', {
        prefix: true,
        suffix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg id={\`\${props.prefix}test\${props.suffix}\`}></svg>;"`,
    )
  })

  it('should prefix masks', () => {
    expect(
      testPlugin('<svg><g mask="url(#test)"></g></svg>', {
        prefix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><g mask={\`url(#\${props.prefix}test)\`}></g></svg>;"`,
    )
  })

  it('should prefix clipPath', () => {
    expect(
      testPlugin('<svg><g clip-path="url(#test)"></g></svg>', {
        prefix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><g clip-path={\`url(#\${props.prefix}test)\`}></g></svg>;"`,
    )
  })

  it('should suffix clipPath', () => {
    expect(
      testPlugin('<svg><g clip-path="url(#test)"></g></svg>', {
        suffix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><g clip-path={\`url(#test\${props.suffix})\`}></g></svg>;"`,
    )
  })

  it('should prefix and suffix clipPath', () => {
    expect(
      testPlugin('<svg><g clip-path="url(#test)"></g></svg>', {
        prefix: true,
        suffix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><g clip-path={\`url(#\${props.prefix}test\${props.suffix})\`}></g></svg>;"`,
    )
  })

  it('should prefix fill', () => {
    expect(
      testPlugin('<svg><g fill="url(#test)"></g></svg>', {
        prefix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><g fill={\`url(#\${props.prefix}test)\`}></g></svg>;"`,
    )
  })

  it('should prefix defs', () => {
    expect(
      testPlugin(
        '<svg><defs><linearGradient id="test"></linearGradient></defs></svg>',
        {
          prefix: true,
        },
      ),
    ).toMatchInlineSnapshot(
      `"<svg><defs><linearGradient id={\`\${props.prefix}test\`}></linearGradient></defs></svg>;"`,
    )
  })

  it('should prefix use', () => {
    expect(
      testPlugin('<svg><use xlink:href="#test"></use></svg>', {
        prefix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><use xlink:href={\`#\${props.prefix}test\`}></use></svg>;"`,
    )
  })

  it('should suffix use', () => {
    expect(
      testPlugin('<svg><use xlink:href="#test"></use></svg>', {
        suffix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><use xlink:href={\`#test\${props.suffix}\`}></use></svg>;"`,
    )
  })

  it('should prefix and suffix use', () => {
    expect(
      testPlugin('<svg><use xlink:href="#test"></use></svg>', {
        prefix: true,
        suffix: true,
      }),
    ).toMatchInlineSnapshot(
      `"<svg><use xlink:href={\`#\${props.prefix}test\${props.suffix}\`}></use></svg>;"`,
    )
  })
})
