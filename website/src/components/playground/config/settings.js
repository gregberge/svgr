const parseObject = (value) =>
  value.split(',').reduce((obj, assignment) => {
    const [left, right] = assignment.split('=')
    return {
      ...obj,
      [left.trim()]: right?.trim(),
    }
  }, {})

const parseJson = (value) => value && JSON.parse(value)

const initialSvgoConfig = JSON.stringify(
  {
    plugins: [
      {
        name: 'preset-default',
        params: { overrides: { removeTitle: false } },
      },
    ],
  },
  null,
  2,
)

const initialPrettierConfig = JSON.stringify({ semi: false }, null, 2)

export const settings = [
  {
    label: 'Dimensions',
    name: 'dimensions',
    type: 'boolean',
    group: 'global',
    default: true,
  },
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
    label: 'TypeScript',
    name: 'typescript',
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
    label: 'Desc prop',
    name: 'descProp',
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
    transform: (value) => (value === 'none' ? false : value),
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
    label: 'Export Type',
    name: 'exportType',
    type: 'enum',
    values: ['named', 'default'],
    group: 'global',
    default: 'default',
  },
  {
    label: 'Named export',
    name: 'namedExport',
    placeholder: 'ReactComponent',
    type: 'string',
    group: 'global',
    default: 'ReactComponent',
  },
  {
    label: 'JSX runtime',
    name: 'jsxRuntime',
    type: 'enum',
    values: ['classic', 'classic-preact', 'automatic', 'none'],
    group: 'global',
    transform: (value) => (value === 'none' ? 'classic' : value),
    default: 'none',
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
    placeholder: initialSvgoConfig,
    type: 'string',
    group: 'svgo',
    default: initialSvgoConfig,
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
    placeholder: initialPrettierConfig,
    type: 'string',
    group: 'prettier',
    default: initialPrettierConfig,
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
