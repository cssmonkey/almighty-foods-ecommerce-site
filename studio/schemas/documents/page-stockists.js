import { FiMap } from 'react-icons/fi';

export default {
  title: 'Stockists',
  name: 'stockistsPage',
  type: 'document',
  icon: FiMap,
  ////__experimental_actions: ['update', 'publish'], // disable for initial publish
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
      title: 'Locations',
      name: 'stockistLocations',
      type: 'array',
      of: [{ type: 'stockist' }]
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
        title: 'Stockists page'
      };
    }
  }
};
