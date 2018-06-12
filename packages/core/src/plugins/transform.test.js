import transform from './transform'

describe('transform', () => {
  it('should wrap it into component', () => {
    const result = transform(
      `<div />`,
      { template: (code, config, state) => `${state.foo}${code}` },
      { foo: 'bar' },
    )

    expect(result).toBe('bar<div />')
  })
})
