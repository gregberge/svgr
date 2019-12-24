const parseObject = value =>
  value.split(',').reduce((obj, assignment) => {
    const [left, right] = assignment.split('=')
    return {
      ...obj,
      [left]: right,
    }
  }, {})

const parseJson = value => value && JSON.parse(value)

export const settings = [
  {
    label: 'Icon',
    name: 'icon',
    type: 'boolean',
    group: 'global',
    default: false,
  },
  {
    label: 'React Native',
    name: 'native',
    type: 'boolean',
    group: 'global',
    default: false,
  },
  {
    label: 'Ref',
    name: 'ref',
    type: 'boolean',
    group: 'global',
    default: false,
  },
  {
    label: 'Memo',
    name: 'memo',
    type: 'boolean',
    group: 'global',
    default: false,
  },
  {
    label: 'Title prop',
    name: 'titleProp',
    type: 'boolean',
    group: 'global',
    default: false,
  },
  {
    label: 'Expand props',
    name: 'expandProps',
    type: 'enum',
    values: ['start', 'end', 'none'],
    group: 'global',
    default: 'end',
    transform: value => (value === 'none' ? false : value),
  },
  {
    label: 'Replace attributes value',
    name: 'replaceAttrValues',
    placeholder: '#063855=currentColor',
    type: 'string',
    group: 'global',
    transform: parseObject,
    default: '',
  },
  {
    label: 'SVG props',
    name: 'svgProps',
    placeholder: 'focusable=false',
    type: 'string',
    group: 'global',
    transform: parseObject,
    default: '',
  },
  {
    label: 'Enable',
    name: 'svgo',
    type: 'boolean',
    group: 'svgo',
    default: true,
  },
  {
    label: 'Config',
    name: 'svgoConfig',
    placeholder: '{ "plugins": [{ "removeTitle": false }] }',
    type: 'string',
    group: 'svgo',
    default:
      '{ "plugins": [{ "removeTitle": false }, { "removeViewBox": false }] }',
    transform: parseJson,
  },
  {
    label: 'Enable',
    name: 'prettier',
    type: 'boolean',
    group: 'prettier',
    default: true,
  },
  {
    label: 'Config',
    name: 'prettierConfig',
    placeholder: '{ "semi": false }',
    type: 'string',
    group: 'prettier',
    default: '{ "semi": false }',
    transform: parseJson,
  },
]

export const getInitialState = () =>
  settings.reduce(
    (state, setting) => ({
      ...state,
      [setting.name]: setting.default,
    }),
    {},
  )

export function stateToSettings(state) {
  return Object.entries(state).reduce((newState, [key, value]) => {
    const { transform } = settings.find(({ name }) => name === key)
    return { ...newState, [key]: transform ? transform(value) : value }
  }, {})
}
