import styled from 'styled-components'

import { theme } from 'helpers'

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  height: ${theme('headerHeight')};
  padding: 0 16px;
`

export default StyledContainer
