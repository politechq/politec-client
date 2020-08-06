import styled from 'styled-components'

import { theme } from 'helpers'

const StyledToolbar = styled.div`
  background: ${theme('contrastColor')};
  display: block;
  border: ${theme('border')};
  border-bottom: 0;
  padding: 8px 24px;
  text-align: left;
`

export default StyledToolbar
