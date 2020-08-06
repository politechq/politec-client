import styled from 'styled-components'

import { always, ifElse, prop } from 'ramda'

const StyledLabel = styled.label`
  position: absolute;
  pointer-events: none;
  font-size: ${ifElse(prop('isAutofilled'), always('11px'), always('15px'))};
  left: 16px;
  top: ${ifElse(prop('isAutofilled'), always('8px'), always('16px'))};
  transition: 0.2s ease all;
  color: #6c6c6c;
`

export default StyledLabel
