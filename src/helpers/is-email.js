import { F, ifElse, pipe, test, toLower } from 'ramda'
import { isString } from 'ramda-extension'

const isEmail = (email: string): boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return ifElse(
    isString,
    pipe(
      toLower,
      test(regex),
    ),
    F,
  )(email)
}

export default isEmail
