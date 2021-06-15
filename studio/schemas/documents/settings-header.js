import { FiAlertCircle } from 'react-icons/fi'

export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Main navigation menu',
      name: 'mainNavigationMenu',
      type: 'array',
      of: [{ type: 'navPage' }]
    },
    {
      title: 'Social media links',
      name: 'socialMedia',
      type: 'array',
      of: [{ type: 'socialLink' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings'
      }
    }
  }
}
