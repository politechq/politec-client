import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import useDocumentTitle from 'hooks/use-document-title'

import { dotPathOr } from 'ramda-extension'

import DATA_TABLE from 'modules/data/graphql/data-table'

import Table from 'components/Table'

const DataTable = () => {
  const { t } = useTranslation()
  const { code } = useParams()
  const history = useHistory()
  useDocumentTitle(t('data-table'))
  const { data, loading } = useQuery(DATA_TABLE, {
    variables: { code },
  })
  return (
    <Table
      actions={[
        {
          func: ({ id }) => history.push(`/data-table/${code}/edit/${id}`),
          icon: 'pen',
          id: 'edit-record',
          name: t('edit-record'),
        },
        {
          func: ({ id }) => {
            console.log('id', id)
          },
          icon: 'trash',
          id: 'delete-record',
          name: t('delete-record'),
        },
      ]}
      columns={dotPathOr([], 'dataTable.attributes', data)}
      data={[]}
      loading={loading}
      pageSizes={[5, 10, 20, 'all']}
      toolbar={[
        {
          func: () => history.push(`/data-table/${code}/add`),
          icon: 'plus',
          id: 'new-record',
          name: t('new-record'),
        },
      ]}
    />
  )
}

export default DataTable
