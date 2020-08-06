import React, { type Element } from 'react'
import { number } from 'prop-types'

import { defaultTo } from 'ramda'

import { StyledSpinner } from './style'

type Props = {|
  size: number,
|}

const Spinner = ({ size }: Props): Element => (
  <StyledSpinner fill={'#6441a5'} name={'spinner'} size={defaultTo(48, size)} />
)

Spinner.propTypes = {
  size: number,
}

export default Spinner
