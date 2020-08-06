import gql from 'graphql-tag'

const ROLES = gql`
  query($offset: Int, $limit: Int) {
    roles(offset: $offset, limit: $limit) {
      id
      name
      code
      createdAt
      users {
        id
        email
        firstName
        lastName
      }
      createdBy
    }
    totalRoles {
      count
    }
  }
`

export default ROLES
