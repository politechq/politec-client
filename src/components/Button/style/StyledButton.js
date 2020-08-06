import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { always, ifElse, pipe, prop } from 'ramda'
import { dotPathOr } from 'ramda-extension'

import { theme } from 'helpers'

const StyledButton = styled.button`
  border: ${theme('border')};
  background: ${ifElse(
    prop('disabled'),
    pipe(
      theme('buttonBackground'),
      lighten(0.25),
    ),
    ifElse(
      prop('outline'),
      theme('buttonOutlineBackground'),
      theme('buttonBackground'),
    ),
  )};
  color: ${ifElse(
    prop('outline'),
    theme('buttonOutlineColor'),
    theme('buttonColor'),
  )};
  font-size: 14px;
  border-radius: 4px;
  padding: 10px 16px 8px;
  width: ${dotPathOr('auto', 'width')};
  cursor: ${ifElse(prop('disabled'), always('not-allowed'), always('pointer'))};
  outline: 0;

  &:hover,
  &:focus {
    background: ${ifElse(
      prop('disabled'),
      pipe(
        theme('buttonBackground'),
        lighten(0.25),
      ),
      pipe(
        ifElse(
          prop('outline'),
          theme('buttonOutlineBackground'),
          theme('buttonBackground'),
        ),
        darken(0.15),
      ),
    )};
    transition: background 0.3s;
  }
`

export default StyledButton
