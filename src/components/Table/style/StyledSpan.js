import styled from 'styled-components'

import { always, prop, when } from 'ramda'

const StyledSpan = styled.span`
  margin-left: 12px;
  ${when(prop('isDragging'), always('opacity: 0.7'))};
  font-size: 14px;
  user-select: none;
`

export default StyledSpan
