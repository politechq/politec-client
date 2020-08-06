import gql from 'graphql-tag'

const USER_ADDED = gql`
  subscription {
    userAdded {
      user {
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
    }
  }
`

export default USER_ADDED
