import gql from 'graphql-tag'

const USERS = gql`
  query($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      id
      email
      firstName
      lastName
      roles {
        id
        name
      }
      createdAt
      avatar
    }
    currentUser {
      id
    }
    totalUsers {
      count
    }
  }
`

export default USERS
