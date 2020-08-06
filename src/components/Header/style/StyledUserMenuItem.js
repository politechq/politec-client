import styled from 'styled-components'
import { darken } from 'polished'

import { compose } from 'ramda'

import { theme } from 'helpers'

const StyledUserMenuItem = styled.li`
  font-size: 14px;

  & a {
    display: block;
    background: ${theme('contrastColor')};
    text-decoration: none;
    color: ${theme('textColor')};
    padding: 16px;
    width: 100%;

    &:hover {
      background: ${compose(
        darken(0.03),
        theme('contrastColor'),
      )};
      transition: background 0.3s;
    }
  }
`

export default StyledUserMenuItem
