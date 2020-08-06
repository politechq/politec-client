import styled from 'styled-components'
import { between, darken } from 'polished'

import { compose } from 'ramda'

import { theme } from 'helpers'

const StyledItem = styled.li`
  font-size: ${between('13px', '15px')};
  color: ${theme('textColor')};
  padding: 4px 0 8px 0;
  width: 100%;
  white-space: nowrap;

  & a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    color: ${compose(
      darken(0.2),
      theme('textColor'),
    )};
    transition: color 0.3s;
  }
`

export default StyledItem
