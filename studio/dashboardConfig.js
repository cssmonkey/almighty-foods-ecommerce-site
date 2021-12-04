export default {
  widgets: [
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: [
          'homePage',
          'page',
          'recipePage',
          'allRecipesPage',
          'shopPage',
          'stockistsPage'
        ]
      },
      layout: { width: 'medium' }
    },
    {
      name: 'project-users'
    },
    {
      name: 'project-info'
    }
  ]
};
