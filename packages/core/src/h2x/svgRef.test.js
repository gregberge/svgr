import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import svgRef from './svgRef'

describe('svgRef', () => {
  it('should add a svg ref attribute', () => {
    const result = transform(
      `<svg width="20" height="20">
        <g stroke="#063855" stroke-width="2" />
      </svg>`,
      { plugins: [jsx, svgRef()] },
    )

    expect(result).toMatchSnapshot()
  })
})
