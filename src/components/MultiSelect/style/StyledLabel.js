import styled from 'styled-components'

import { always, ifElse, prop } from 'ramda'

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  pointer-events: none;
  font-size: ${ifElse(prop('hasValue'), always('11px'), always('15px'))};
  right: 16px;
  left: 16px;
  top: ${ifElse(prop('hasValue'), always('8px'), always('16px'))};
  transition: 0.2s ease all;
  color: #6c6c6c;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`

export default StyledLabel
