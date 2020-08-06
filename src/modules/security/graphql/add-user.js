import gql from 'graphql-tag'

const ADD_USER = gql`
  mutation($email: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, firstName: $firstName, lastName: $lastName) {
      id
      email
      firstName
      lastName
      createdAt
      avatar
    }
  }
`

export default ADD_USER
