import { FiGrid } from 'react-icons/fi';

export default {
  title: 'Collection',
  name: 'collection',
  type: 'document',
  icon: FiGrid,
  fields: [
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'collectionGrid' },
        { type: 'grid' },
        { type: 'hero' },
        { type: 'dividerPhoto' },
        { type: 'freeform' }
      ],
      validation: Rule =>
        Rule.custom(blocks => {
          const collectionGrids =
            blocks?.filter(block => block._type === 'collectionGrid') || [];

          const collectionGridItems = collectionGrids.map(
            (item, index) => [{ _key: item._key }] || [index]
          );

          return collectionGrids.length === 1
            ? true
            : {
                message:
                  'You must have one "Collection Grid" module on the page',
                paths: collectionGridItems
              };
        })
    },
    {
      title: 'Products Grid',
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
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `/shop/${slug.current}`;
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)'
      };
    }
  }
};
