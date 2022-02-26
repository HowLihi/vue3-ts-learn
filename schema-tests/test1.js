const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
ajv.addKeyword('test', {
  validate(schema, data) {
    if (schema === true) return true
    else return schema.length === 6
  },
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'kocky',
  age: 38,
  isWorker: true,
  pets: ['mimi', 'mama'],
})
if (!valid) console.log(validate.errors)
