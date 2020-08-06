import styled from 'styled-components'
import { size } from 'polished'

import { compose, prop } from 'ramda'

const getAvatarSize = (avatarSize): string => {
  const list = {
    l: 64,
    m: 32,
    s: 16,
    xl: 96,
  }
  return `${prop(avatarSize, list)}px`
}

const StyledAvatar = styled.img`
  ${compose(
    size,
    getAvatarSize,
    prop('size'),
  )};
  border-radius: 50%;
  cursor: pointer;
  user-drag: none;
  user-select: none;
`

export default StyledAvatar
