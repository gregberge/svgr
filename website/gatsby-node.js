const { getGatsbyNode } = require('smooth-doc/node')

module.exports = getGatsbyNode({
  root: __dirname,
})

module.exports.createPages = ({ actions }) => {
  actions.createRedirect({
    fromPath: `/docs/`,
    toPath: `/docs/getting-started/`,
    redirectInBrowser: true,
  })
}
