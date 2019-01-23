module.exports.createPages = ({ actions }) => {
  actions.createRedirect({
    fromPath: `/docs/`,
    toPath: `/docs/getting-started/`,
    redirectInBrowser: true,
  })
}
