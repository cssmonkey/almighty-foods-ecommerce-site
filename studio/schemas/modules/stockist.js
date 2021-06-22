import { FiMapPin } from 'react-icons/fi';

export default {
  title: 'Stockist',
  name: 'stockist',
  type: 'object',
  icon: FiMapPin,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'url',
      title: 'Website url',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Scotland', value: 'Scotland' },
          { title: 'England', value: 'England' },
          { title: 'Wales', value: 'Wales' },
          { title: 'Norther Ireland', value: 'Northern Ireland' },
          { title: 'Rest of the world', value: 'Rest of the World' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'coordinates',
      title: 'Stockist coordinates',
      type: 'geopoint'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title = 'Untitled' }) {
      return {
        title
      };
    }
  }
};
