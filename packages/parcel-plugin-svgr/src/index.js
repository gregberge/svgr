// Parcel requires that plugins be exported with `module.exports`.
// It won't be able to load the plugin if it is exported with "export default plugin" and then transpiled.
module.exports = function svgrParcelPlugin(bundler) {
  // Parcel requires that the asset be passed in as a module path.
  bundler.addAssetType('svg', require.resolve('./asset'))
}
