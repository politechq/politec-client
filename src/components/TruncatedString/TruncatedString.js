import React from 'react'

import Truncate from 'react-truncate'
import Tooltip from 'react-tooltip'

import { StyledDots } from './style'

type PropType = {
  value: string,
  width: number,
}

const TruncatedString = ({ value, width }: PropType) => (
  <Truncate
    ellipsis={
      <StyledDots data-tip={value}>
        {'…'}
        <Tooltip />
      </StyledDots>
    }
    width={width}
  >
    {value}
  </Truncate>
)

export default TruncatedString
