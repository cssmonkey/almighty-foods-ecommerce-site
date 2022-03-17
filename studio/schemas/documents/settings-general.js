export default {
  title: 'General Settings',
  name: 'generalSettings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Live Site URL',
      description: 'The root domain or subdomain of your website.',
      name: 'siteURL',
      type: 'url'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings'
      };
    }
  }
};
