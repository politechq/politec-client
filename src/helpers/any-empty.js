import { any } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'

const anyEmpty = any(isNilOrEmpty)

export default anyEmpty
