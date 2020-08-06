import styled from 'styled-components'

import { theme } from 'helpers'

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - ${theme('headerHeight')} - 16px);
`

export default StyledMenuContainer
