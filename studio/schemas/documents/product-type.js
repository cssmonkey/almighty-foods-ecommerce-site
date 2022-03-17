export default {
  title: 'Product type',
  name: 'productType',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title
      };
    }
  }
};
