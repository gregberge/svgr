import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import expandProps from './expandProps'

describe('expandProps', () => {
  it('should expand props in the end by default', () => {
    const result = transform(
      `<svg width="10" height="10">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, expandProps()] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should expand props in the end with option', () => {
    const result = transform(
      `<svg width="10" height="10">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, expandProps('end')] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should expand props at the start with option', () => {
    const result = transform(
      `<svg width="10" height="10">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, expandProps('start')] },
    )

    expect(result).toMatchSnapshot()
  })
})
