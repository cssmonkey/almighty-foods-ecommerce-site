import { FiBookOpen } from 'react-icons/fi'

export default {
  title: 'Ingredients',
  name: 'recipeIngredients',
  type: 'document',
  icon: FiBookOpen,
  fields: [
    {
      title: 'Add recipe ingredients',
      name: 'ingredients',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      title: 'Add any products to ingredients list',
      name: 'ingredientProducts',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      validation: Rule => Rule.unique()
    }
  ]
}
