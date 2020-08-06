import gql from 'graphql-tag'

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
      firstName
      lastName
      roles {
        id
        name
        code
      }
      avatar
    }
  }
`

export default CURRENT_USER
