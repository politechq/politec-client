import gql from 'graphql-tag'

const ROLE = gql`
  query($id: Int!) {
    role(id: $id) {
      id
      name
      code
      createdAt
      createdBy
      users {
        id
        email
        firstName
        lastName
      }
    }
  }
`

export default ROLE
