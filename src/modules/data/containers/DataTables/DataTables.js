import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import { compose, lensProp, over, prop, propOr } from 'ramda'
import { dotPathOr } from 'ramda-extension'

import DATA_TABLES from 'modules/data/graphql/data-tables'

import Table from 'components/Table'
import TruncatedString from 'components/TruncatedString'
import UserView from 'components/UserView'

import formatDate from 'utils/format-date'

const DataTables = () => {
  const { i18n, t } = useTranslation()
  const history = useHistory()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const formatDateWithLang = formatDate(prop('language', i18n))
  useDocumentTitle(t('data-tables'))
  const { data, loading, refetch } = useQuery(DATA_TABLES, {
    variables: {
      limit,
      offset,
    },
  })
  return (
    <Table
      columns={[
        {
          id: 'name',
          sortable: true,
          title: t('table-name'),
        },
        {
          id: 'createdAt',
          render: compose(
            TruncatedString,
            over(lensProp('value'), formatDateWithLang),
          ),
          sortable: true,
          title: t('created-at'),
        },
        {
          id: 'createdBy',
          render: UserView,
          sortable: true,
          title: t('created-by'),
        },
        {
          id: 'editedAt',
          render: compose(
            TruncatedString,
            over(lensProp('value'), formatDateWithLang),
          ),
          sortable: true,
          title: t('edited-at'),
        },
        {
          id: 'editedBy',
          render: UserView,
          sortable: true,
          title: t('edited-by'),
        },
      ]}
      data={propOr([], 'dataTables', data)}
      limit={limit}
      loading={loading}
      offset={offset}
      onRowClick={({ code }) => history.push(`/data-tables/${code}`)}
      pageSizes={[5, 10, 20, 'all']}
      pagination
      refetch={refetch}
      setLimit={setLimit}
      setOffset={setOffset}
      toolbar={[
        {
          func: () => history.push('/new-data-table'),
          icon: 'plus',
          id: 'new-table',
          name: 'New table',
        },
      ]}
      total={dotPathOr(0, 'totalDataTables.count', data)}
    />
  )
}

export default DataTables
