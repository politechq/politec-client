import { __, compose, concat, toString, when } from 'ramda'
import { isNumber } from 'ramda-extension'

const px = when(
  isNumber,
  compose(
    concat(__, 'px'),
    toString,
  ),
)

export default px
