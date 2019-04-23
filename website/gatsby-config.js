module.exports = {
  __experimentalThemes: [
    {
      resolve: require.resolve('smooth-doc'),
      options: {
        name: 'SVGR',
        slug: 'svgr',
        github: 'https://github.com/smooth-code/svgr',
        menu: ['About', 'Usage', 'Configuring SVGR', 'Advanced'],
        nav: [
          { title: 'Playground', url: '/playground/' },
          { title: 'Usage', url: '/docs/' },
        ],
      },
    },
  ],
}
