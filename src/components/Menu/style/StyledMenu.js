import styled from 'styled-components'

import { theme } from 'helpers'

import { always, compose, equals, ifElse, prop } from 'ramda'

const StyledMenu = styled.aside`
  position: static;
  background: ${theme('menuBackgroundColor')};
  padding: 8px 0 0 16px;
  width: ${ifElse(
    compose(
      equals('entered'),
      prop('state'),
    ),
    always('48px'),
    always('300px'),
  )};
  height: calc(100vh - ${theme('headerHeight')});
  overflow: hidden;
  transition: width 0.25s;
  z-index: 4;

  @media (max-width: 768px) {
    position: absolute;
  }
`

export default StyledMenu
