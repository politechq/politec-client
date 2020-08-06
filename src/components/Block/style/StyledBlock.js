import styled from 'styled-components'

import { always, ifElse, prop } from 'ramda'
import { alwaysZero } from 'ramda-extension'

const StyledBlock = styled.div`
  text-align: right;
  margin-bottom: ${ifElse(prop('noMargin'), alwaysZero, always('16px'))};
`

export default StyledBlock
