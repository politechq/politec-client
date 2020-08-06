import styled from 'styled-components'

import { theme } from 'helpers'

const StyledValue = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 6px;
  border: ${theme('border')};
  background: ${theme('buttonBackground')};
  border-radius: 4px;
  margin-right: 8px;
  margin-top: 6px;
`

export default StyledValue
