import styled, { keyframes } from 'styled-components'

import Icon from 'components/Icon'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled(Icon)`
  animation: ${rotate} 2s linear infinite;
`

export default StyledSpinner
