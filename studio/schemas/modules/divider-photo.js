import { FiImage } from 'react-icons/fi'

export default {
  title: 'Image',
  name: 'dividerPhoto',
  type: 'object',
  icon: FiImage,
  fields: [
    {
      title: 'Photo',
      name: 'photo',
      type: 'figure'
    }
  ],
  preview: {
    select: {
      photo: 'photo'
    },
    prepare({ photo }) {
      return {
        title: 'Image',
        media: photo
      }
    }
  }
}
