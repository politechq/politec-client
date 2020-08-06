import styled from 'styled-components'

import { always, compose, equals, ifElse, prop, when } from 'ramda'
import { alwaysOne, alwaysZero } from 'ramda-extension'

import { theme } from 'helpers'

const isEntered = compose(
  equals('entered'),
  prop('state'),
)

const StyledOptions = styled.div`
  background: ${theme('inputBackground')};
  position: absolute;
  margin-top: 2px;
  width: 100%;
  border: ${theme('border')};
  border-radius: 4px;
  text-align: left;
  transition: opacity 0.3s;
  opacity: ${ifElse(isEntered, alwaysOne, alwaysZero)};
  z-index: 3;
  ${when(
    compose(
      equals('bottom'),
      prop('position'),
    ),
    always('transform: translateY(calc(-100% - 32px))'),
  )}
`

export default StyledOptions
