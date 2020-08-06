import styled from 'styled-components'
import { size } from 'polished'

import { ReactComponent as Logo } from '../assets/logo.svg'

const StyledLogo = styled(Logo)`
  ${size('24px')};
  fill: #fff;
  margin-right: 12px;
`

export default StyledLogo
