import gql from 'graphql-tag'

const USERS_BY_NAME = gql`
  query($search: String!, $limit: Int) {
    usersByName(search: $search, limit: $limit) {
      id
      firstName
      lastName
      avatar
    }
    currentUser {
      id
    }
  }
`

export default USERS_BY_NAME
