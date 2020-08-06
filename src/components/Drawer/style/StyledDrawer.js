import styled from 'styled-components'

import { always, equals, ifElse, pipe, prop } from 'ramda'
import { alwaysZero } from 'ramda-extension'

import { theme } from 'helpers'

const isEntered = pipe(
  prop('state'),
  equals('entered'),
)

const StyledDrawer = styled.div`
  background: ${theme('menuBackgroundColor')};
  padding: 24px 16px;
  position: fixed;
  right: ${ifElse(isEntered, alwaysZero, always('-400px'))};
  width: 400px;
  top: ${theme('headerHeight')};
  height: calc(100vh - ${theme('headerHeight')});
  transition: right 0.25s;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 3;
`

export default StyledDrawer
