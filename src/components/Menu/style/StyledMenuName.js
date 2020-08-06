import styled from 'styled-components'

import { always, ifElse, prop } from 'ramda'

import { theme } from 'helpers'

const StyledMenuName = styled.span`
  display: inline-block;
  width: 100%;
  margin-left: 14px;
  border-bottom: ${ifElse(
    prop('noBorder'),
    always('none'),
    theme('menuBorder'),
  )};
  padding: 3px 0 8px;
`

export default StyledMenuName
