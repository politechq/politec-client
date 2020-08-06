import DataTables from './containers/DataTables'
import DataTable from './containers/DataTable'
import NewDataTable from './containers/NewDataTable'

import en from './locales/en.json'
import ru from './locales/ru.json'

const data = {
  locales: {
    en,
    ru,
  },
  menu: [
    {
      icon: 'database',
      iconBackground: '#ff9500',
      id: 'data-tables',
      link: '/data-tables',
      name: 'data-tables',
    },
  ],
  name: 'data',
  routes: [
    {
      container: DataTables,
      id: 'data-tables',
      path: '/data-tables',
    },
    {
      container: DataTable,
      id: 'data-table',
      path: '/data-tables/:code',
    },
    {
      container: NewDataTable,
      id: 'new-data-table',
      path: '/new-data-table',
    },
  ],
}

export default data
