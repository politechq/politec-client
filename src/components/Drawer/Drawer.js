import React, { useRef } from 'react'
import { bool } from 'prop-types'

import { CSSTransition } from 'react-transition-group'
import { Scrollbars } from 'react-custom-scrollbars'

import { StyledDrawer } from './style'

const Drawer = ({ children, isOpen, ...props }) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition in={isOpen} nodeRef={nodeRef} timeout={0}>
      {state => (
        <StyledDrawer state={state} {...props}>
          <Scrollbars>{children}</Scrollbars>
        </StyledDrawer>
      )}
    </CSSTransition>
  )
}

Drawer.propTypes = {
  isOpen: bool.isRequired,
}

export default Drawer
