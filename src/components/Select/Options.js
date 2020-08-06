import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { CSSTransition } from 'react-transition-group'

import {
  add,
  always,
  gt,
  ifElse,
  length,
  map,
  multiply,
  pipe,
  subtract,
} from 'ramda'
import { lengthLte } from 'ramda-adjunct'

import { StyledOption, StyledOptions, StyledOverlay } from './style'

const Options = ({
  isExpanded,
  onChange,
  options,
  selectRef,
  selectValue,
  toggleOptions,
}) => {
  const [position, setPosition] = useState('bottom')
  const nodeRef = useRef(null)
  const getOptionsHeight = ifElse(
    lengthLte(3),
    pipe(
      length,
      multiply(36),
    ),
    always(120),
  )
  const renderOptions = map(({ name, value: optionValue }) => (
    <StyledOption
      key={optionValue}
      onClick={() => {
        selectValue(optionValue)
        onChange(null, optionValue)
      }}
    >
      {name}
    </StyledOption>
  ))
  useEffect(() => {
    const getOptionsPosition = pipe(
      element =>
        subtract(
          window.innerHeight,
          add(element.offsetTop, element.offsetHeight),
        ),
      fromBottom =>
        ifElse(gt(120), () => setPosition('bottom'), () => setPosition('top'))(
          fromBottom,
        ),
    )
    getOptionsPosition(selectRef.current)
  }, [isExpanded, selectRef])
  return (
    <CSSTransition in={isExpanded} nodeRef={nodeRef} timeout={0} unmountOnExit>
      {state => (
        <Fragment>
          <StyledOptions position={position} state={state}>
            <Scrollbars style={{ height: getOptionsHeight(options) }}>
              {renderOptions(options)}
            </Scrollbars>
          </StyledOptions>
          <StyledOverlay onClick={toggleOptions} />
        </Fragment>
      )}
    </CSSTransition>
  )
}

export default Options
