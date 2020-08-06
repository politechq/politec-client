import React from 'react'
import { string } from 'prop-types'

import Avatar from 'components/Avatar'

const AvatarUploader = ({ src }) => (
  <div>
    <Avatar size={'xl'} src={src} />
  </div>
)

AvatarUploader.propTypes = {
  src: string,
}

export default AvatarUploader
