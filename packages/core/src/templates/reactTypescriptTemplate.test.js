import reactTypescriptTemplate from './reactTypescriptTemplate'

const t = (options, state = { componentName: 'Test' }) =>
  reactTypescriptTemplate('<Svg />', options, state)

describe('reactTypescriptTemplate', () => {
  it('should wrap code into a component', () => {
    expect(t({})).toMatchSnapshot()
    expect(t({ titleProp: true })).toMatchSnapshot()
    expect(t({ ref: true })).toMatchSnapshot()
    expect(t({ expandProps: true })).toMatchSnapshot()
    expect(t({ titleProp: true, ref: true })).toMatchSnapshot()
    expect(t({ titleProp: true, expandProps: true })).toMatchSnapshot()
    expect(t({ ref: true, expandProps: true })).toMatchSnapshot()
  })
})
