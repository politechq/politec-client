import styled from 'styled-components'
import { darken } from 'polished'

import { compose } from 'ramda'

import { theme } from 'helpers'

const StyledDots = styled.span`
  color: ${compose(
    darken(0.25),
    theme('textColor'),
  )};
`

export default StyledDots
