import gql from 'graphql-tag'

const UPDATE_TOKEN = gql`
  mutation($fingerprint: String!) {
    updateToken(fingerprint: $fingerprint) {
      token
      refreshToken
    }
  }
`

export default UPDATE_TOKEN
