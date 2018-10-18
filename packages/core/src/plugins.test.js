import { resolvePlugins, loadPlugin } from './plugins'

describe('#resolvePlugins', () => {
  const state = { caller: { defaultPlugins: ['from-state-plugin'] } }
  const config = { plugins: ['from-config'] }

  it('should use config if plugins are specified in', () => {
    expect(resolvePlugins(config, state)).toEqual(['from-config'])
  })

  it('should use caller.defaultPlugins in second choice', () => {
    expect(resolvePlugins({}, state)).toEqual(['from-state-plugin'])
  })

  it('should default to ["@svgr/plugin-jsx"]', () => {
    expect(resolvePlugins({}, {})).toEqual(['@svgr/plugin-jsx'])
  })

  it('should support caller with "defaultPlugins" in second choice', () => {
    expect(resolvePlugins({}, { caller: {} })).toEqual(['@svgr/plugin-jsx'])
  })
})

describe('#loadPlugin', () => {
  it('should throw if not found', () => {
    expect(() => loadPlugin('not-found-plugin')).toThrow(
      'Module "not-found-plugin" missing. Maybe `npm install not-found-plugin` could help!',
    )
  })

  it('should load plugin', () => {
    expect(loadPlugin('@svgr/plugin-jsx')).toBeInstanceOf(Function)
  })
})
