import React, { useEffect, useState, useRef } from 'react'

import { CSSTransition } from 'react-transition-group'

import {
  always,
  cond,
  curry,
  equals,
  gte,
  ifElse,
  T,
  when,
} from 'ramda'
import { isFunction } from 'ramda-adjunct'

import Icon from 'components/Icon'

import { StyledIcon, StyledInfo, StyledMessage, StyledNotification, StyledTitle } from './style'

const Notification = ({
  deleteCurrent,
  icon,
  message,
  status,
  timeout,
  title,
  updateCurrent,
  ...props
}) => {
  const [show, setShow] = useState(false)
  const nodeRef = useRef(null)
  const getStatusColor = cond([
    [equals('success'), always('#34c759')],
    [equals('warning'), always('#ffcc01')],
    [equals('error'), always('#ff3b30')],
    [T, always('#34c759')],
  ])
  const getMessage = curry((func, passedProps) =>
    when(isFunction, always(func(passedProps)))(func),
  )
  const second = 1000
  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      ifElse(gte(second), deleteCurrent, updateCurrent)(timeout)
    }, second)
  }, [timeout, deleteCurrent, updateCurrent])
  return (
    <CSSTransition in={show} nodeRef={nodeRef} timeout={0}>
      {state => (
        <StyledNotification
          background={getStatusColor(status)}
          {...props}
          state={state}
        >
          <StyledInfo>
            <StyledTitle>{title}</StyledTitle>
            <StyledMessage>{getMessage(message, { timeout })}</StyledMessage>
          </StyledInfo>
          <StyledIcon>
            <Icon fill={getStatusColor(status)} name={icon} size={16} />
          </StyledIcon>
        </StyledNotification>
      )}
    </CSSTransition>
  )
}

export default Notification
