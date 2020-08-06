import React from 'react'

import Input from 'components/Input'
import TextArea from 'components/TextArea'

import { ifElse } from 'ramda'
import { dotPath } from 'ramda-extension'

const EditText = ifElse(
  dotPath('attributeOptions.multiline'),
  props => <TextArea {...props} />,
  props => <Input {...props} />,
)

export default EditText
