import gql from 'graphql-tag'

const USER_NAME = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export default USER_NAME
