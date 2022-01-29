const path = require('path')

module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'SVGR',
        author: 'Greg Bergé',
        description: 'Transforms SVG into React Components.',
        siteUrl: 'https://react-svgr.com',
        githubRepositoryURL: 'https://github.com/gregberge/svgr',
        githubDefaultBranch: 'main',
        baseDirectory: path.resolve(__dirname, '..'),
        navItems: [
          { title: 'Playground', url: '/playground/' },
          { title: 'Docs', url: '/docs/' },
        ],
        sections: ['About', 'Usage', 'Configuring SVGR', 'Advanced'],
        carbonAdsURL:
          '//cdn.carbonads.com/carbon.js?serve=CE7I5K3N&placement=react-svgrcom',
        docSearch: {
          apiKey: '0c7343afd83c189413499c62c1df6853',
          indexName: 'smooth-code-svgr',
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-154496255-2',
      },
    },
  ],
}
