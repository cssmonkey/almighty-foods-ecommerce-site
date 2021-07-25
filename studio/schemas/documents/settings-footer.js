export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  //__experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Accreditation logos',
      name: 'accreditationLogos',
      type: 'array',
      of: [
        {
          name: 'accreditationLogo',
          type: 'object',
          fields: [
            {
              title: 'Image',
              name: 'accreditationImage',
              type: 'figure'
            },
            {
              title: 'Site URL',
              name: 'accreditationURL',
              type: 'url'
            }
          ],
          preview: {
            select: {
              media: 'accreditationImage'
            },
            prepare({ media }) {
              return {
                title: media.alt || 'Accreditation logo',
                media
              };
            }
          }
        }
      ]
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
      };
    }
  }
};
