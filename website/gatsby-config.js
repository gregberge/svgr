const { getGatsbyConfig } = require('smooth-doc/config')

module.exports = getGatsbyConfig({
  root: __dirname,
  name: 'SVGR',
  slug: 'svgr',
  github: 'https://github.com/smooth-code/svgr',
  menu: ['About', 'Usage', 'Configuring SVGR', 'Advanced'],
  nav: [
    { title: 'Playground', url: '/playground/' },
    { title: 'Usage', url: '/docs/' },
  ],
})
