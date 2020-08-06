import styled from 'styled-components'

import { theme } from 'helpers'

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme('contrastColor')};
  border: ${theme('border')};
  border-top: 0;
  padding: 16px 24px;
  margin-top: 1px;
`

export default StyledPagination
