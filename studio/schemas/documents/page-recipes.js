import { FiBookOpen } from 'react-icons/fi';

export default {
  title: 'All Recipes Page',
  name: 'allRecipesPage',
  type: 'document',
  icon: FiBookOpen,
  //__experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Intro text',
      name: 'introText',
      type: 'simplePortableText'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'All Recipes Page'
      };
    }
  }
};
