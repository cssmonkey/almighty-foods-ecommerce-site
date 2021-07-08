import { FiMail } from 'react-icons/fi';

export default {
  title: 'Contact form',
  name: 'contactForm',
  type: 'object',
  icon: FiMail,
  fields: [
    {
      name: 'formType',
      title: 'Form type',
      type: 'string',
      options: {
        list: [
          { title: 'Customer contact form', value: 'contactEnquiry' },
          { title: 'Wholesaler contact form', value: 'wholesaleContactEnquiry' }
        ]
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form'
      };
    }
  }
};
