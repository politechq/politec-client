import AddUser from './containers/AddUser'
import AddRole from './containers/AddRole'
import EditUser from './containers/EditUser'
import EditRole from './containers/EditRole'
import Users from './containers/Users'
import Roles from './containers/Roles'
import Settings from './containers/Settings'
import ViewRole from './containers/ViewRole'
import ViewUser from './containers/ViewUser'

import en from './locales/en.json'
import ru from './locales/ru.json'

const security = {
  locales: {
    en,
    ru,
  },
  menu: [
    {
      icon: 'user',
      iconBackground: '#34c759',
      id: 'users',
      link: '/users',
      name: 'users',
    },
    {
      icon: 'lock',
      iconBackground: '#5856d6',
      id: 'roles',
      link: '/roles',
      name: 'roles',
    },
    {
      icon: 'cog',
      iconBackground: '#8e8e93',
      id: 'settings',
      link: '/settings',
      name: 'settings',
    },
  ],
  routes: [
    {
      container: AddUser,
      id: 'add-user',
      path: '/add-user',
    },
    {
      container: EditRole,
      id: 'edit-role',
      path: '/edit-role/:id',
    },
    {
      container: EditUser,
      id: 'edit-user',
      path: '/edit-user/:id',
    },
    {
      container: ViewUser,
      id: 'view-user',
      path: '/view-user/:id',
    },
    {
      container: ViewRole,
      id: 'view-role',
      path: '/view-role/:id',
    },
    {
      container: Users,
      id: 'users',
      path: '/users',
    },
    {
      container: AddRole,
      id: 'add-role',
      path: '/add-role',
    },
    {
      container: Roles,
      id: 'roles',
      path: '/roles',
    },
    {
      container: Settings,
      id: 'settings',
      path: '/settings',
    },
  ],
}

export default security
