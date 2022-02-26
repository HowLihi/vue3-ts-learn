export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck',
      },
      lastName: {
        type: 'string',
      },
      telephone: {
        type: 'string',
        MinLength: 10,
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: { title: 'First Name' },
      lastName: {
        title: 'Last Name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'since 1940',
    password: 'noneed',
  },
}
