import styled from 'styled-components'
import { between } from 'polished'

import { theme } from 'helpers'

const StyledTd = styled.div`
  background: ${theme('contrastColor')};
  position: relative;
  font-size: ${between('13px', '15px')};
  padding: 0 24px;
  height: 48px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  &[data-sticky-last-left-td] {
    border-right: ${theme('border')};
  }

  &[data-sticky-first-right-td] {
    border-left: ${theme('border')};
  }
`

export default StyledTd
