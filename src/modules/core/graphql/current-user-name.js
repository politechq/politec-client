import gql from 'graphql-tag'

const CURRENT_USER_NAME = gql`
  query {
    currentUser {
      id
      firstName
      lastName
    }
  }
`

export default CURRENT_USER_NAME
