import styled from 'styled-components'

import { theme } from 'ramda'

const StyledSpan = styled.span`
  font-size: 11px;
  color: ${theme('textColor')};
  margin-right: 4px;
  user-select: none;
  cursor: normal;
`

export default StyledSpan
