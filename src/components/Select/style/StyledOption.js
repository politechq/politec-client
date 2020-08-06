import styled from 'styled-components'
import { darken } from 'polished'

import { compose } from 'ramda'

import { theme } from 'helpers'

const StyledOption = styled.div`
  width: 100%;
  color: ${theme('inputColor')};
  font-size: 14px;
  padding: 10px;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;

  &focus,
  &:hover,
  &:active {
    background: ${compose(
      darken(0.05),
      theme('inputBackground'),
    )};
  }
`

export default StyledOption
