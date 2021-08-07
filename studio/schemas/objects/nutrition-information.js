export default {
  title: 'Nutritional information',
  name: 'nutritionInformation',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Nutritional information'
    },
    {
      name: 'gramsPerServing',
      type: 'string',
      title: 'Grams per serving',
      initialValue: '30g'
    },
    {
      name: 'nutritionInformationRow',
      title: 'Nutrients',
      description: 'Typical nutrient values per 100g and per serving',
      type: 'array',
      of: [
        {
          type: 'nutritionInformationRow'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};
