import gql from 'graphql-tag'

const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id) {
      id
      email
      firstName
      lastName
      roles
      createdAt
      avatar
    }
  }
`

export default DELETE_USER
