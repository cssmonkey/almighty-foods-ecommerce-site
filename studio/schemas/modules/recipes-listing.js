import { FiBookOpen } from 'react-icons/fi';

export default {
  title: 'Recipes list',
  name: 'recipesList',
  type: 'object',
  icon: FiBookOpen,
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
      title: 'Max number of recipes to show',
      name: 'maxNumber',
      type: 'number'
    }
  ]
};
