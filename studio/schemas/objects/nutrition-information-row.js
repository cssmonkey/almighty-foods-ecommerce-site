export default {
  title: 'Nutrition information row',
  name: 'nutritionInformationRow',
  type: 'object',
  fields: [
    {
      name: 'nutrientName',
      type: 'string',
      title: 'Nutrient'
    },
    {
      name: 'per100g',
      type: 'string',
      title: 'Per 100g'
    },
    {
      name: 'perServing',
      type: 'string',
      title: 'Per serving'
    }
  ],
  preview: {
    select: {
      title: 'nutrientName'
    }
  }
};
