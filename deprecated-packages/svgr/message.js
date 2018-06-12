/* eslint-disable no-console, import/no-unresolved */
const githubCurrentUser = require('github-current-user')

githubCurrentUser.verify((err, verified, username) => {
  console.log(`Hello ${username || ''}!`)
  console.log(`SVGR 🦁 v2.0.0 is released 🎉`)
  console.log(
    `It is now splitted into several packages, what are you looking for?\n`,
  )
  console.log(`Command line    👉   @svgr/cli`)
  console.log(`Node API        👉   @svgr/core`)
  console.log(`Webpack         👉   @svgr/webpack`)
  console.log(`Rollup          👉   @svgr/rollup`)
  console.log(`Pick the one you need!`)
})
