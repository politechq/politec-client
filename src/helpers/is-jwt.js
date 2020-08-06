import { both, isString, test } from 'ramda'

const isJwt = both(
  isString,
  test(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-=]*)/),
)

export default isJwt
