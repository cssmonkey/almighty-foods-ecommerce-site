export default {
  title: 'Product ingredient',
  name: 'productIngredient',
  type: 'object',
  fields: [
    {
      title: 'Before text',
      name: 'beforeText',
      type: 'string'
    },
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }]
    },
    {
      title: 'After text',
      name: 'afterText',
      type: 'string'
    }
  ],
  preview: {
    select: {
      beforeText: 'beforeText',
      producTitle: 'product.title',
      afterText: 'afterText'
    },
    prepare({ beforeText, producTitle, afterText }) {
      const before = beforeText ? beforeText + ' ' : '';
      return {
        title: `${before}${producTitle} ${afterText}`
      };
    }
  }
};
