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
    }
  ]
}
