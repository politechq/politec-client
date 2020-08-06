import styled from 'styled-components'

import { always, compose, prop, when } from 'ramda'
import { isTrue } from 'ramda-adjunct'

import { theme } from 'helpers'

const StyledResizer = styled.div`
  width: 1px;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  border-left: ${theme('border')};
  margin: 12px 0;
  display: block;
  height: calc(100% - 24px);
  ${compose(
    when(isTrue, always('border-color: #000')),
    prop('isResizing'),
  )};
  touch-action: none;
`

export default StyledResizer
