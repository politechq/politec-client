import styled from 'styled-components'

import { theme } from 'helpers'

const StyledContainer = styled.div`
  display: flex;
  background: ${theme('contrastColor')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 245px;
`

export default StyledContainer
