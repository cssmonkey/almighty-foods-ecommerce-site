export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Accreditation logos',
      name: 'accreditationLogos',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navLink' }, { type: 'navDropdown' }]
    },
    {
      title: 'Footer navigation',
      name: 'footerNavigation',
      type: 'array',
      of: [{ type: 'navPage' }]
    },
    {
      title: 'Main office address',
      name: 'headquartersAddress',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
}
