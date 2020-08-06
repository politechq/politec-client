import React, { useState } from 'react'

import {
  append,
  assoc,
  equals,
  map,
  propEq,
  subtract,
  reject,
  when,
} from 'ramda'

import { nanoid } from 'nanoid'

import NotificationContext from './NotificationContext'
import NotificationList from './NotificationList'

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const addNotification = message => {
    const notification = {
      id: nanoid(8),
      ...message,
    }
    setNotifications(append(notification, notifications))
  }
  const deleteNotification = id =>
    setNotifications(
      reject(
        ({ id: notificationId }) => equals(notificationId, id),
        notifications,
      ),
    )
  const updateTimeout = (id, timeout) =>
    setNotifications(
      map(when(propEq('id', id), assoc('timeout', subtract(timeout, 1000)))),
    )
  const value = {
    addNotification,
  }
  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationList
        deleteNotification={deleteNotification}
        notifications={notifications}
        updateTimeout={updateTimeout}
      />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
