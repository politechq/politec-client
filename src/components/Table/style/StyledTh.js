import styled from 'styled-components'
import { between } from 'polished'

import { always, ifElse, prop } from 'ramda'

import { theme } from 'helpers'

const StyledTh = styled.div`
  background: ${theme('contrastColor')};
  position: relative;
  align-items: center;
  color: #9a9a9a;
  font-size: ${between('13px', '15px')};
  font-weight: normal;
  text-align: left;
  padding: 16px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  & span {
    cursor: ${ifElse(prop('sortable'), always('pointer'), always('default'))};
  }
`

export default StyledTh
