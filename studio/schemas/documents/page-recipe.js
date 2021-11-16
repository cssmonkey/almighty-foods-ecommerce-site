import { FiFile } from 'react-icons/fi';

export default {
  title: 'Recipe',
  name: 'recipePage',
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
      title: 'Ingredient lists',
      name: 'ingredientLists',
      type: 'array',
      of: [
        {
          title: 'Ingredients',
          type: 'recipeIngredients'
        }
      ]
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'freeform'
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
