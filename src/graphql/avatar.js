import gql from 'graphql-tag'

const AVATAR = gql`
  query {
    currentUser {
      id
      avatar
    }
  }
`

export default AVATAR
