import { mergeAll } from 'ramda'

import dateFormat from './date-format'
import theme from './theme'

export default mergeAll([dateFormat, theme])
