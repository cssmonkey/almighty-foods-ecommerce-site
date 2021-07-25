import { FiAlignLeft } from 'react-icons/fi';

export default {
  title: 'Freeform text',
  name: 'freeform',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    {
      title: ' ',
      name: 'content',
      type: 'complexPortableText'
    },
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
    select: {
      content: 'content.0.children'
    },
    prepare({ content }) {
      return {
        title: 'Freeform text',
        subtitle: content && content[0]?.text
      };
    }
  }
};
