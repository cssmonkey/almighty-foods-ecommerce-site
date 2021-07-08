import { FiDownload } from 'react-icons/fi';

export default {
  title: 'Asset Download',
  name: 'assetDownload',
  type: 'file',
  icon: FiDownload,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Submit Button Text',
      name: 'submit',
      type: 'string',
      validation: Rule => Rule.required()
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
