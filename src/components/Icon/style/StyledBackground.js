import styled from 'styled-components'
import { size } from 'polished'

import { __, compose, concat, prop, toString } from 'ramda'

const StyledBackground = styled.button`
  position: relative;
  background: ${prop('background')};
  color: #fff;
  border: 0;
  outline: 0;
  ${compose(
    size,
    concat(__, 'px'),
    toString,
    prop('size'),
  )}
  border-radius: 4px;
`

export default StyledBackground
