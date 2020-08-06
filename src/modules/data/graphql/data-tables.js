import gql from 'graphql-tag'

const DATA_TABLES = gql`
  query {
    dataTables {
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
    totalDataTables {
      count
    }
  }
`

export default DATA_TABLES
