import { FiFile } from 'react-icons/fi';

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: FiFile,
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
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      title: 'Intro text',
      name: 'introText',
      type: 'simplePortableText'
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'quote' },
        { type: 'grid' },
        { type: 'dividerPhoto' },
        { type: 'assetDownload' },
        { type: 'newsletter' },
        { type: 'contactForm' },
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
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `/${slug.current}`;
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)'
      };
    }
  }
};
