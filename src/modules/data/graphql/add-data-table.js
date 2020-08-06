import gql from 'graphql-tag'

const ADD_DATA_TABLE = gql`
  mutation($name: String!, $code: String!, $attributes: [AttributeInput]!) {
    addDataTable(name: $name, code: $code, attributes: $attributes) {
      name
      code
      createdAt
      createdBy
      editedAt
      editedBy
      attributes {
        id
        title
        type
        required
      }
    }
  }
`

export default ADD_DATA_TABLE
