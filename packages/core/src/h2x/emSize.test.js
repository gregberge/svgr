import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import emSize from './emSize'

describe('emSize', () => {
  it('should add width & height if not present', () => {
    const result = transform(
      `<svg>
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, emSize()] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should replace width and height value by 1em', () => {
    const result = transform(
      `<svg width="10px" height="10px">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, emSize()] },
    )

    expect(result).toMatchSnapshot()
  })

  it('should keep other attributes', () => {
    const result = transform(
      `<svg viewbox="0 0 10 10" width="10px" height="10px">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, emSize()] },
    )

    expect(result).toMatchSnapshot()
  })
})
