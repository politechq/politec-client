import Messages from './containers/Messages'

import en from './locales/en.json'
import ru from './locales/ru.json'

const messenger = {
  locales: {
    en,
    ru,
  },
  menu: [
    {
      icon: 'comment',
      iconBackground: '#007aff',
      id: 'messages',
      link: '/messages',
      name: 'messages',
    },
  ],
  routes: [
    {
      container: Messages,
      id: 'messages',
      path: '/messages',
    },
  ],
}

export default messenger
