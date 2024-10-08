import { FiHome } from 'react-icons/fi';

export default {
  title: 'Home',
  name: 'homePage',
  type: 'document',
  icon: FiHome,
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Overlay header with transparency?',
      name: 'hasTransparentHeader',
      type: 'boolean',
      description:
        'When toggled on, the header will appear with a transparent background over the first content module and text/logos will be white until scrolling is engaged.'
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'productsGrid' },
        { type: 'recipesList' },
        { type: 'grid' },
        { type: 'dividerPhoto' },
        { type: 'quote' },
        { type: 'newsletter' },
        { type: 'freeform' }
      ]
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
        title: 'Home Page'
      };
    }
  }
};
