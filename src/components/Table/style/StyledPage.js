import styled from 'styled-components'
import { lighten } from 'polished'

import { always, compose, ifElse, prop, unless } from 'ramda'

import { theme } from 'helpers'

const StyledPage = styled.p`
  background: ${ifElse(
    prop('isActive'),
    theme('primaryColor'),
    always('transparent'),
  )};
  color: ${ifElse(prop('isActive'), theme('buttonColor'), theme('textColor'))};
  border: ${theme('border')};
  font-size: 11px;
  margin: 0 2px;
  padding: 5px 4px;
  min-width: 24px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: ${unless(
      prop('isActive'),
      compose(
        lighten(0.05),
        theme('primaryColor'),
      ),
    )};
    color: ${theme('buttonColor')};
    transition: all 0.3s;
  }
`

export default StyledPage
