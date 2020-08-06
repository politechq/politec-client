import styled from 'styled-components'
import { darken } from 'polished'

import { compose, prop, unless } from 'ramda'
import {
  equalsToFalse,
} from 'ramda-extension'

import { theme } from 'helpers'

import StyledTd from './StyledTd'

const StyledRow = styled.div`
  border-bottom: ${theme('border')};
  ${unless(
    compose(
      equalsToFalse,
      prop('hoverable'),
    ),
    ({ theme: colors }) => `
      &:hover .${prop('styledComponentId', StyledTd)} {
        background: ${darken(0.03, colors.contrastColor)} !important;
        transition: background 0.3s;
        cursor: pointer;
      }
  `,
  )}
  &:last-child {
    border-bottom: 0;
  }
`

export default StyledRow
