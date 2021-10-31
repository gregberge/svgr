import jsx from '@svgr/plugin-jsx'
import { getPlugins, resolvePlugin } from './plugins'
import { State, Config } from '.'

describe('#getPlugins', () => {
  const state: Partial<State> = {
    caller: { defaultPlugins: ['from-state-plugin'] },
  }
  const config: Config = { plugins: ['from-config'] }

  it('should use config if plugins are specified in', () => {
    expect(getPlugins(config, state)).toEqual(['from-config'])
  })

  it('should use caller.defaultPlugins in second choice', () => {
    expect(getPlugins({}, state)).toEqual(['from-state-plugin'])
  })

  it('should default to ["@svgr/plugin-jsx"]', () => {
    expect(getPlugins({}, {})).toEqual([jsx])
  })

  it('should support caller with "defaultPlugins" in second choice', () => {
    expect(getPlugins({}, { caller: {} })).toEqual([jsx])
  })
})

describe('#resolvePlugin', () => {
  it('should use function', () => {
    expect(resolvePlugin(jsx)).toBe(jsx)
  })

  it('should throw if not found', () => {
    expect(() => resolvePlugin('not-found-plugin')).toThrow(
      'Module "not-found-plugin" missing. Maybe `npm install not-found-plugin` could help!',
    )
  })

  it('should load plugin', () => {
    expect(resolvePlugin('@svgr/plugin-jsx')).toBe(jsx)
  })
})
