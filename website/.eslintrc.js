module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',

    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/sort-comp': 'off',

    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'warning',
    'import/extensions': 'warning',

    'class-methods-use-this': 'off',

    'jsx-a11y/label-has-for': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        // As configured in webpack and jest
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
}
