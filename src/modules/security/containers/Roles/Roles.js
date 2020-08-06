import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import Table from 'components/Table'
import TruncatedString from 'components/TruncatedString'
import UserView from 'components/UserView'

import {
  always,
  compose,
  concat,
  ifElse,
  isNil,
  lensProp,
  over,
  prop,
  propOr,
  toString,
} from 'ramda'
import { dotPathOr } from 'ramda-extension'

import ROLES from 'modules/security/graphql/roles'

import formatDate from 'utils/format-date'

const Roles = () => {
  const { i18n, t } = useTranslation()
  const history = useHistory()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const formatDateWithLang = formatDate(prop('language', i18n))
  useDocumentTitle(t('roles'))
  const { data, loading, refetch } = useQuery(ROLES, {
    variables: {
      limit,
      offset,
    },
  })
  return (
    <Table
      actions={[
        {
          func: compose(
            history.push,
            concat('/edit-role/'),
            toString,
            prop('id'),
          ),
          icon: 'pen',
          id: 'edit-role',
          name: t('edit-role'),
        },
        {
          func: () => {},
          icon: 'trash',
          id: 'delete-role',
          name: t('delete-role'),
        },
      ]}
      columns={[
        {
          id: 'name',
          sortable: true,
          title: t('role-name'),
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
          render: ifElse(
            compose(
              isNil,
              prop('id'),
            ),
            always('—'),
            UserView,
          ),
          sortable: true,
          title: t('created-by'),
        },
      ]}
      data={propOr([], 'roles', data)}
      limit={limit}
      loading={loading}
      offset={offset}
      onRowClick={compose(
        history.push,
        concat('/view-role/'),
        toString,
        prop('id'),
      )}
      pageSizes={[5, 10, 20, 'all']}
      pagination
      refetch={refetch}
      setLimit={setLimit}
      setOffset={setOffset}
      toolbar={[
        {
          func: () => history.push('/add-role'),
          icon: 'plus',
          id: 'add-role',
          name: t('add-role'),
        },
      ]}
      total={dotPathOr(0, 'totalRoles.count', data)}
      withSettings
    />
  )
}

export default Roles
