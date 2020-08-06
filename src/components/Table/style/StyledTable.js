import styled from 'styled-components'

import { theme } from 'helpers'

const StyledTable = styled.div`
  display: block;
  background: ${theme('contrastColor')};
  border: ${theme('border')};
  overflow: auto;
  padding: 0 1px;

  & [data-sticky-td] {
    position: sticky;
  }
`

export default StyledTable
