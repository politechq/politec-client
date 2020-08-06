import { useContext } from 'react'

import NotificationContext from './NotificationContext'

const useNotification = () => {
  const notification = useContext(NotificationContext)
  return notification
}

export default useNotification
