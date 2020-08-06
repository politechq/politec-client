import React from 'react'
import type { ComponentType } from 'react'

import { defaultTo } from 'ramda'

import { StyledAvatar } from './style'

import defaultAvatar from './default.png'

type SizeType = 's' | 'm' | 'l' | 'xl'

type PropsType = {
  size: SizeType,
  src: string,
}

const Avatar = ({
  size: avatarSize,
  src,
  ...props
}: PropsType): ComponentType => (
  <StyledAvatar
    alt={'avatar'}
    size={defaultTo('m', avatarSize)}
    src={defaultTo(defaultAvatar, src)}
    {...props}
  />
)

export default Avatar
