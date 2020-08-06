import styled from 'styled-components'
import { size } from 'polished'

import { always, compose, equals, ifElse, prop } from 'ramda'
import { alwaysOne, alwaysZero } from 'ramda-extension'

import { theme } from 'helpers'

const isEntered = compose(
  equals('entered'),
  prop('state'),
)

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${prop('background')};
  color: #fff;
  ${size(90, 250)};
  border: ${theme('border')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 16px;
  user-select: none;
  margin-bottom: 16px;
  opacity: ${ifElse(isEntered, alwaysOne, alwaysZero)};
  margin-top: ${ifElse(isEntered, alwaysZero, always('-100px'))};
  transition: all 0.35s;
`

export default StyledNotification
