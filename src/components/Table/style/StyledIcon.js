import styled from 'styled-components'

import Icon from 'components/Icon'

import { theme } from 'helpers'

const StyledIcon = styled(Icon)`
  fill: ${theme('textColor')};
  margin-right: 12px;
  cursor: pointer;

  &:hover {
    transition: fill 0.3s;
    fill: ${theme('primaryColor')};
  }
`

export default StyledIcon
