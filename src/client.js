import { ApolloClient } from '@apollo/client'
import { ApolloLink, Observable, split as apolloSplit } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { RetryLink } from 'apollo-link-retry'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import gql from 'graphql-tag'

import browserFingerprint from 'browser-fingerprint'

import { always, both, equals, forEach, flip, isNil, not, unless } from 'ramda'

import ls from 'utils/ls'

const httpUri = 'http://localhost:8000/graphql'
const wsUri = 'ws://localhost:8000/graphql'

const httpLink = new HttpLink({
  credentials: 'include',
  uri: httpUri,
})

const wsLink = new WebSocketLink({
  credentials: 'include',
  options: {
    reconnect: true,
  },
  uri: wsUri,
})

const authLink = setContext(() => {
  const userToken = ls.get('TOKEN')
  return unless(
    isNil,
    always({
      headers: {
        'x-token': userToken,
      },
    }),
  )(userToken)
})

const retryLink = new RetryLink({
  attempts: {
    max: 5,
    retryIf: error => !!error,
  },
  delay: {
    initial: 300,
    jitter: true,
    max: Infinity,
  },
})

const promiseToObservable = promise =>
  new Observable(subscriber => {
    promise.then(
      value => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      err => subscriber.error(err),
    )
    return subscriber
  })

const errorLink = onError(
  ({ forward, graphQLErrors, networkError, operation }) => {
    const refreshToken = () => {
      const fingerprint = browserFingerprint()
      const newContext = {
        query: gql`
          mutation($fingerprint: String!) {
            updateToken(fingerprint: $fingerprint) {
              token
              refreshToken
            }
          }
        `,
        variables: {
          fingerprint,
        },
      }
      operation.setContext(old => {
        console.log('old', old)
        return {
          newContext,
        }
      })
      console.log('new operation', operation)
      forward(operation)
    }
    const checkGraphQLErrors = unless(
      isNil,
      forEach(
        ({ extensions: { code } }) =>
          equals('UNAUTHENTICATED', code) &&
          promiseToObservable(refreshToken()).flatMap(() => forward(operation)),
      ),
    )
    checkGraphQLErrors(graphQLErrors)
    const checkNetworkError = unless(
      isNil,
      unless((error => not(equals(error.statusCode)), console.log)),
    )
    checkNetworkError(networkError)
    return false
  },
)

const terminatingLink = apolloSplit(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return both(equals('OperationDefinition'), flip(equals('subscription')))(
      kind,
      operation,
    )
  },
  wsLink,
  httpLink,
)
const link = ApolloLink.from([authLink, errorLink, retryLink, terminatingLink])

const defaultOptions = {
  mutate: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  },
  watchQuery: {
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
  },
}

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  defaultOptions,
  link,
})

export default client
