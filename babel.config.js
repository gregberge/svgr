module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '12' }, loose: true }],
    '@babel/preset-typescript',
  ],
}
