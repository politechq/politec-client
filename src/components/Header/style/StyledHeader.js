import styled from 'styled-components'

import { theme } from 'helpers'

const StyledHeader = styled.header`
  background: ${theme('headerBackgroundColor')};
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 3px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 5;
`

export default StyledHeader
