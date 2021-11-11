export default {
  title: 'Team member',
  name: 'teamMember',
  type: 'object',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'simplePortableText'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'figure'
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
};
