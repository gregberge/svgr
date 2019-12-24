module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'SVGR',
        slug: 'svgr',
        author: 'Greg Bergé',
        description: 'Transforms SVG into React Components.',
        siteUrl: 'https://react-svgr.com',
        github: 'https://github.com/gregberge/svgr',
        menu: ['About', 'Usage', 'Configuring SVGR', 'Advanced'],
        nav: [
          { title: 'Playground', url: '/playground/' },
          { title: 'Usage', url: '/docs/' },
        ],
        codeFundProperty: 269,
        googleAnalytics: 'UA-154496255-2',
        algoliaDocSearch: {
          apiKey: '0c7343afd83c189413499c62c1df6853',
          indexName: 'smooth-code-svgr',
        },
      },
    },
  ],
}
