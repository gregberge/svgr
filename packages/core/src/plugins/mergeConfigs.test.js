import mergeConfigs from './mergeConfigs'

describe('mergeConfigs', () => {
  it('should merge objects', () => {
    const result = mergeConfigs({ param1: 'value1' }, { param2: 'value2' }, { param3: 'value3' });
    expect(result).toEqual({ param1: 'value1', param2: 'value2', param3: 'value3' })
  })

  it('should merge arrays in objects', () => {
    const result = mergeConfigs(
      { param1: ['value1'] },
      { param1: ['value2'] },
      { param1: ['value3'] }
    );
    expect(result).toEqual({ param1: [ 'value1', 'value2', 'value3' ] })
  })

  it('should merge arrays on object second level', () => {
    const result = mergeConfigs(
      { level1: { level2: ['value1'] } },
      { level1: { level2: ['value2'] } },
      { level1: { level2: ['value3'] } });
    expect(result).toEqual({ level1: { level2: ['value1', 'value2', 'value3'] } })
  })

  it('should merge arrays on objects second level with additional params', () => {
    const result = mergeConfigs(
      { level1: { level2: ['value1'], param1: 'value1' } },
      { level1: { level2: ['value2'], param2: 'value2' } },
      { level1: { level2: ['value3'], param3: 'value3' } });
    expect(result).toEqual(
      { level1: { level2: ['value1',
                           'value2',
                           'value3'], param1: 'value1',
                                      param2: 'value2',
                                      param3: 'value3' } })
  })
})
