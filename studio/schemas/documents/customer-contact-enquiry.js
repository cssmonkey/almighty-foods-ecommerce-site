import { FiMail } from 'react-icons/fi';

export default {
  title: 'Contact enquires',
  name: 'contactEnquiry',
  type: 'document',
  icon: FiMail,
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Email address',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Subject',
      name: 'subject',
      type: 'string'
    },
    {
      title: 'Message',
      name: 'message',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Customer contact enquiry'
      };
    }
  }
};
