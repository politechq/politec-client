import gql from 'graphql-tag'

const DATA_TABLE = gql`
  query($code: String!) {
    dataTable(code: $code) {
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
        options {
          multiline
          currency
        }
        required
      }
    }
  }
`

export default DATA_TABLE
