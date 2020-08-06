import styled from 'styled-components'
import { size } from 'polished'

import { theme } from 'helpers'

const StyledCheckbox = styled.input`
  display: inline-block;
  position: relative;
  background: transparent;
  border-radius: 4px;
  ${size('24px')};
  cursor: pointer;
  appearance: none;
  outline: 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    ${size('24px')};
    background: ${theme('primaryColor')};
    cursor: pointer;
  }

  &:checked:after {
    content: '';
    display: block;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 4px;
    left: 8px;
  }
`

export default StyledCheckbox
