import { FiGrid } from 'react-icons/fi';

export default {
  title: 'Products Grid',
  name: 'productsGrid',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      validation: Rule => Rule.unique()
    },
    {
      title: 'Show All products CTA?',
      name: 'showCta',
      type: 'boolean',
      description:
        'When toggled on, CTA link to All products page will be displayed'
    }
  ]
};
