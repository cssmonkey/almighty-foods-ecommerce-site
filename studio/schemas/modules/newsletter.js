import { FiSend } from 'react-icons/fi'

export default {
  title: 'Newsletter Form',
  name: 'newsletter',
  type: 'object',
  icon: FiSend,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subTitle',
      type: 'string'
    },
    {
      title: 'Submit Button Text',
      name: 'submit',
      type: 'string'
    },
    {
      title: 'Success Message',
      name: 'successMsg',
      type: 'complexPortableText'
    },
    {
      title: 'Error Message',
      name: 'errorMsg',
      type: 'complexPortableText'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter Form'
      }
    }
  }
}
