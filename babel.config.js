module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: '12' }, loose: true }],
      '@babel/preset-typescript',
    ],
  }
}
