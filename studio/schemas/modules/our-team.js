import { FiUsers } from 'react-icons/fi';

export default {
  title: 'Our team',
  name: 'ourTeam',
  type: 'object',
  icon: FiUsers,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Team members',
      name: 'teamMembers',
      type: 'array',
      of: [
        {
          title: 'Team member',
          type: 'teamMember'
        }
      ]
    }
  ]
};
