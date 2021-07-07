import { FiMail } from 'react-icons/fi';

export default {
  title: 'Wholesale Contact',
  name: 'wholesaleContactPage',
  type: 'document',
  icon: FiMail,
  //__experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Intro text',
      name: 'introText',
      type: 'simplePortableText'
    },
    {
      name: 'additionalText',
      title: 'Additional text',
      type: 'freeform'
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
        title: 'Wholesale Contact Page'
      };
    }
  }
};
