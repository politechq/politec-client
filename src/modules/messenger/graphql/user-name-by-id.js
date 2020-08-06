import gql from 'graphql-tag'

const USER_NAME_BY_ID = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      avatar
    }
  }
`

export default USER_NAME_BY_ID
