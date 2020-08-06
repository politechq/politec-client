import gql from 'graphql-tag'

const USER = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      avatar
      roles {
        id
        name
      }
    }
    currentUser {
      id
    }
  }
`

export default USER
