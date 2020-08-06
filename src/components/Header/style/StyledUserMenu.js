import styled from 'styled-components'

import { theme } from 'helpers'

const StyledUserMenu = styled.div`
  position: absolute;
  margin-top: 4px;
  right: 16px;
  background: ${theme('inputBackground')};
  width: 150px;
  border: ${theme('border')};
  border-radius: 4px;
  z-index: 4;
`

export default StyledUserMenu
