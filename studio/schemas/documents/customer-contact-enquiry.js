import { FiMail } from 'react-icons/fi';

export default {
  title: 'Contact enquires',
  name: 'contactEnquiry',
  type: 'document',
  icon: FiMail,
  ////__experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Email address',
      name: 'email',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Subject',
      name: 'subject',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Message',
      name: 'message',
      type: 'text',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'name'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle
      };
    }
  }
};
