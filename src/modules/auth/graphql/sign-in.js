import gql from 'graphql-tag'

const SIGN_IN = gql`
  mutation($email: String!, $password: String!, $fingerprint: String!) {
    signIn(email: $email, password: $password, fingerprint: $fingerprint) {
      token
      refreshToken
    }
  }
`

export default SIGN_IN
