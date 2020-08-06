import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import {
  always,
  append,
  compose,
  concat,
  dec,
  divide,
  filter,
  ifElse,
  inc,
  join,
  lensProp,
  map,
  over,
  prop,
  propOr,
  pipe,
  toString,
} from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { dotPathOr, notEqual } from 'ramda-extension'

import DELETE_USER from 'modules/security/graphql/delete-user'
import USER_ADDED from 'modules/security/graphql/user-added'
import USER_DELETED from 'modules/security/graphql/user-deleted'
import USERS from 'modules/security/graphql/users'

import Avatar from 'components/Avatar'
import Table from 'components/Table'
import { useNotification } from 'components/NotificationProvider'
import TruncatedString from 'components/TruncatedString'

import formatDate from 'utils/format-date'
import { declOfNum } from 'helpers'

const Users = (): Element => {
  const { i18n, t } = useTranslation()
  const history = useHistory()
  const { addNotification } = useNotification()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const formatDateWithLang = formatDate(prop('language', i18n))
  const spacer = join(' ')
  const commer = join(', ')
  useDocumentTitle(t('users'))
  const { data, loading, refetch, subscribeToMore } = useQuery(USERS, {
    variables: {
      limit,
      offset,
    },
  })
  const [deleteUser] = useMutation(DELETE_USER)
  const renderRoles = ifElse(
    isNilOrEmpty,
    always('—'),
    pipe(
      map(({ name }) => name),
      commer,
    ),
  )
  const columns = useMemo(
    () => [
      {
        id: 'avatar',
        render: ({ value }) => <Avatar size={'m'} src={value} />,
        sortable: false,
        title: t('avatar'),
        width: 95,
      },
      {
        id: 'email',
        sortable: true,
        title: t('email'),
        width: 180,
      },
      {
        id: 'firstName',
        sortable: true,
        title: t('first-name'),
      },
      {
        id: 'lastName',
        sortable: true,
        title: t('last-name'),
      },
      {
        id: 'roles',
        render: ({ value, width }) => (
          <TruncatedString value={renderRoles(value)} width={width} />
        ),
        sortable: false,
        title: t('roles'),
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
    ],
    [formatDateWithLang, renderRoles, t],
  )
  useEffect(() => {
    subscribeToMore({
      document: USER_ADDED,
      updateQuery: (
        { totalUsers: { count }, users },
        {
          subscriptionData: {
            data: {
              userAdded: { user },
            },
          },
        },
      ) => ({
        users: append(user, users),
        /*
         * totalUsers: {
         *   count: inc(count),
         * },
         */
      }),
    })
    subscribeToMore({
      document: USER_DELETED,
      updateQuery: (
        { totalUsers: { count }, users },
        {
          subscriptionData: {
            data: {
              userDeleted: { user },
            },
          },
        },
      ) => ({
        users: filter(({ id }) => notEqual(id, user.id), users),
        /*
         * totalUsers: {
         *   count: dec(count),
         * },
         */
      }),
    })
  }, [subscribeToMore])
  return (
    <Fragment>
      <Table
        actions={[
          {
            func: compose(
              history.push,
              concat('/edit-user/'),
              toString,
              prop('id'),
            ),
            icon: 'pen',
            id: 'edit-user',
            name: t('edit-user'),
          },
          {
            func: ({ firstName, id, lastName }) => {
              const name = spacer([firstName, lastName])
              addNotification({
                callback: () => deleteUser({ variables: { id } }),
                icon: 'times',
                message: ({ timeout }) => {
                  const seconds = divide(timeout, 1000)
                  return t('user-will-be-deleted', {
                    declSeconds: declOfNum(seconds, [
                      t('decl-seconds-1'),
                      t('decl-seconds-2'),
                      t('decl-seconds-3'),
                    ]),
                    name,
                    seconds,
                  })
                },
                status: 'error',
                timeout: 5000,
                title: t('user-deletion'),
              })
            },
            icon: 'trash',
            id: 'delete-user',
            isAvailable: ({ id }) =>
              notEqual(id, dotPathOr(null, 'currentUser.id', data)),
            name: t('delete-user'),
          },
        ]}
        columns={columns}
        data={propOr([], 'users', data)}
        limit={limit}
        loading={loading}
        name={'users'}
        offset={offset}
        onRowClick={compose(
          history.push,
          concat('/view-user/'),
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
            func: () => history.push('/add-user'),
            icon: 'plus',
            id: 'add-user',
            name: t('add-user'),
          },
        ]}
        total={dotPathOr(0, 'totalUsers.count', data)}
        withSettings
      />
    </Fragment>
  )
}

export default Users
