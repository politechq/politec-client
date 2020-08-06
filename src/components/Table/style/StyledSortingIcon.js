import styled from 'styled-components'
import { size } from 'polished'

const StyledSortingIcon = styled.span`
  display: inline-block;
  ${size(12)};
  margin-left: 4px;
  cursor: pointer;

  & svg {
    position: absolute;
    margin-top: 1px;
  }
`

export default StyledSortingIcon
