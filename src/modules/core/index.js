import Home from './containers/Home'
import Changelog from './containers/Changelog'

import en from './locales/en.json'
import ru from './locales/ru.json'

const core = {
  locales: {
    en,
    ru,
  },
  menu: [
    {
      icon: 'home',
      iconBackground: '#ff3b30',
      id: 'home',
      link: '/',
      name: 'home',
    },
  ],
  name: 'core',
  routes: [
    {
      container: Home,
      id: 'home',
      path: '/',
    },
    {
      container: Changelog,
      id: 'changelog',
      path: '/changelog',
    },
  ],
}

export default core
