import React from 'react'
import { arrayOf, func, shape, string } from 'prop-types'

import { StyledToolbar } from './style'

const Toolbar = ({ renderActions, toolbar }) => (
  <StyledToolbar>{renderActions(toolbar)}</StyledToolbar>
)

Toolbar.propTypes = {
  renderActions: func.isRequired,
  toolbar: arrayOf(
    shape({
      func: func.isRequired,
      icon: string.isRequired,
      id: string.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
}

export default Toolbar
