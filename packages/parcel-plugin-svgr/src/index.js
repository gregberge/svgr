// Parcel requires that plugins be exported with module.exports.
// It won't be able to load the plugin if it is exported with "export default" and then transpiled.
module.exports = function svgrParcelPlugin (bundler) {
  // Parcel requires that the import be a module path.
  bundler.addAssetType('svg', require.resolve('./asset'))
}
