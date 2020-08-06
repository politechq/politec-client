import { curry } from 'ramda'
import { dotPath } from 'ramda-extension'

const theme = curry((prop: string, props): string => dotPath(`theme.${prop}`, props))

export default theme
