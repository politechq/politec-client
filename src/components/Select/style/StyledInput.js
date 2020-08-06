import styled from 'styled-components'

import Input from 'components/Input'

import { theme } from 'helpers'

const StyledInput = styled(Input)`
  color: transparent;
  text-shadow: 0 0 0 ${theme('inputColor')};
`

export default StyledInput
