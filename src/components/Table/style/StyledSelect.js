import styled from 'styled-components'
import { size } from 'polished'

import Select from 'components/Select'

const StyledSelect = styled(Select)`
  margin-left: 8px;

  & input {
    font-size: 13px;
    ${size('20px', '42px')};
    padding: 14px 8px 12px;
    text-align: center;
    cursor: pointer;
  }

  & div div div {
    font-size: 13px;
  }
`

export default StyledSelect
