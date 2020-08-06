import React, { Element } from 'react'

import { defaultToFalse } from 'ramda-extension'

import { StyledBlock } from './style'

type PropsType = {
  noMargin?: boolean,
}

const Block = ({ noMargin, ...props }: PropsType): Element => (
  <StyledBlock noMargin={defaultToFalse(noMargin)} {...props} />
)

export default Block
