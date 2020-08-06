import gql from 'graphql-tag'

const USER_DELETED = gql`
  subscription {
    userDeleted {
      user {
        id
      }
    }
  }
`

export default USER_DELETED
