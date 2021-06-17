import { FiAlignCenter } from 'react-icons/fi'

export default {
  title: 'Quote',
  name: 'quote',
  type: 'object',
  icon: FiAlignCenter,
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      text: 'text'
    },
    prepare({ text }) {
      return {
        title: 'Quote',
        subtitle: text
      }
    }
  }
}
