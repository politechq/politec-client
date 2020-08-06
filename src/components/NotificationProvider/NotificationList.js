import React from 'react'

import { map } from 'ramda'

import Notification from './Notification'

import { StyledNotificationList } from './style'

const NotificationList = ({
  deleteNotification,
  notifications,
  updateTimeout,
}) => {
  const renderNotifications = map(props => {
    const { callback, id, timeout } = props
    return (
      <Notification
        deleteCurrent={() => {
          deleteNotification(id)
          if (callback) {
            callback()
          }
        }}
        key={id}
        updateCurrent={() => updateTimeout(id, timeout)}
        {...props}
      />
    )
  })
  return (
    <StyledNotificationList>
      {renderNotifications(notifications)}
    </StyledNotificationList>
  )
}

export default NotificationList
