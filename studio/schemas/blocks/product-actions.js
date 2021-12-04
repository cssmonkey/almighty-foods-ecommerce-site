import { FiShoppingCart } from 'react-icons/fi';

export default {
  title: 'Product actions',
  name: 'productActions',
  type: 'object',
  icon: FiShoppingCart,
  fields: [
    {
      title: 'Alignment',
      name: 'textAlign',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Center', value: 'center' }
        ]
      },
      initialValue: 'center'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Product actions'
      };
    }
  }
};
