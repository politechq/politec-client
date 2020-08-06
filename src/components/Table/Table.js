import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useColumnOrder,
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table'
import { useSticky } from 'react-table-sticky'

import Tooltip from 'react-tooltip'

import {
  __,
  always,
  append,
  cond,
  curry,
  defaultTo,
  equals,
  findIndex,
  identity,
  ifElse,
  inc,
  isEmpty,
  map,
  mergeLeft,
  not,
  pipe,
  prepend,
  prop,
  subtract,
  T,
  when,
} from 'ramda'
import { isTrue } from 'ramda-adjunct'
import { alwaysEmptyString, defaultToTrue, ltThanLength } from 'ramda-extension'

import Spinner from 'components/Spinner'
import TruncatedString from 'components/TruncatedString'

import Pagination from './Pagination'
import Settings from './Settings'
import Toolbar from './Toolbar'

import {
  StyledContainer,
  StyledIcon,
  StyledHeaderRow,
  StyledResizer,
  StyledRow,
  StyledSortingIcon,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTableHead,
  StyledTd,
  StyledTh,
} from './style'

const Table = ({
  actions,
  columns,
  data,
  limit,
  loading,
  name,
  offset,
  onRowClick,
  pageSizes,
  pagination,
  refetch,
  setLimit,
  setOffset,
  showNumbers = true,
  toolbar,
  total = 0,
  withSettings,
}) => {
  const { t } = useTranslation()
  const [formattedColumns, setFormattedColumns] = useState([])
  const [settingsOpened, setSettingsOpened] = useState(false)
  const defaultColumn = useMemo(
    () => ({
      maxWidth: 400,
      minWidth: 30,
      width: 150,
    }),
    [],
  )
  const renderActions = pipe(
    (action, actionData) =>
      map(newAction => mergeLeft(newAction, { data: actionData }), action),
    map(
      ({ id, name, icon, func, data: fieldData, isAvailable = T }) =>
        isAvailable(data) && (
          <Fragment key={id}>
            <StyledIcon
              data-event={'mouseenter'}
              data-event-off={'mouseleave'}
              data-tip={name}
              name={icon}
              onClick={event => {
                event.stopPropagation()
                func(fieldData)
              }}
              size={12}
            />
            <Tooltip />
          </Fragment>
        ),
    ),
  )
  const formatColumns = curry((cols, opts) =>
    pipe(
      map(({ id, render, sortable, title, ...headerProps }) => ({
        accessor: id,
        /*
         * Cell: ifElse(
         *   compose(
         *     isNil,
         *     prop('render'),
         *   ),
         *   compose(
         *     TruncatedString,
         *     applySpec({
         *       value: prop('value'),
         *       width: compose(
         *         subtract(__, 16),
         *         dotPath('column.width'),
         *       ),
         *     }),
         *   ),
         *   ({ render, column: { width }, ...props }) =>
         *     render({ width, ...prop }),
         * ),
         */
        Cell: ({ column: { width }, value }) => {
          const paddingSize = 16
          return render ? (
            render({ value, width })
          ) : (
            <TruncatedString
              value={value}
              width={subtract(width, paddingSize)}
            />
          )
        },
        disableSortBy: not(defaultToTrue(sortable)),
        Header: title,
        ...headerProps,
      })),
      when(
        always(prop('showNumbers', opts)),
        prepend({
          Cell: ({ row, sortedRows }) =>
            inc(findIndex(({ id }) => equals(id, row.id), sortedRows)),
          disableSortBy: true,
          Header: '#',
          id: '__number__',
          render: identity,
          sticky: 'left',
          width: 60,
        }),
      ),
      when(
        always(prop('actions', opts)),
        append({
          Cell: ({ row: { original } }) =>
            renderActions(prop('actions', opts), original),
          disableSortBy: true,
          Header: t('actions'),
          id: '__actions__',
          sticky: 'right',
          width: 100,
        }),
      ),
    )(cols),
  )
  useEffect(() => {
    setFormattedColumns(formatColumns(columns, { actions, showNumbers }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, columns, showNumbers, setFormattedColumns])
  const {
    allColumns,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setColumnOrder,
    visibleColumns,
  } = useTable(
    {
      columns: formattedColumns,
      data,
      defaultColumn,
    },
    useColumnOrder,
    useFlexLayout,
    useResizeColumns,
    useSortBy,
    useSticky,
  )
  const lengthBiggerThanZero = ltThanLength(0)
  const renderContainer = Component =>
    always(
      <StyledContainer>
        <Component />
      </StyledContainer>,
    )
  const renderTableBody = cond([
    [
      pipe(
        prop('loading'),
        isTrue,
      ),
      renderContainer(Spinner),
    ],
    [
      pipe(
        prop('rows'),
        isEmpty,
      ),
      renderContainer(() => <span>{t('no-data')}</span>),
    ],
    [
      T,
      ({ rows: rowList }) => (
        <StyledTableBody>
          {map(row => {
            prepareRow(row)
            const { original } = row
            return (
              <StyledRow
                {...row.getRowProps()}
                hoverable
                onClick={() => onRowClick(original)}
              >
                {pipe(
                  prop('cells'),
                  map(cell => (
                    <StyledTd {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </StyledTd>
                  )),
                )(row)}
              </StyledRow>
            )
          }, rowList)}
        </StyledTableBody>
      ),
    ],
  ])
  const getToolbarItems = curry((toolbarList, makeSettings) =>
    pipe(
      defaultTo([]),
      when(
        always(isTrue(makeSettings)),
        append(
          {
            func: () => setSettingsOpened(true),
            icon: 'tools',
            id: 'settings',
            name: t('settings'),
          },
          __,
        ),
      ),
    )(toolbarList),
  )
  const renderPagination = ifElse(
    isTrue,
    always(
      <Pagination
        limit={limit}
        loading={loading}
        offset={offset}
        pageSizes={pageSizes}
        refetch={refetch}
        resetSorting={() => {}}
        setLimit={setLimit}
        setOffset={setOffset}
        total={total}
      />,
    ),
    alwaysEmptyString,
  )
  const renderSettings = ifElse(
    isTrue,
    always(
      <Settings
        allColumns={allColumns}
        name={name}
        setColumnOrder={setColumnOrder}
        setSettingsOpened={setSettingsOpened}
        settingsOpened={settingsOpened}
        showActions={Boolean(actions)}
        showNumbers={showNumbers}
        visibleColumns={visibleColumns}
      />,
    ),
    alwaysEmptyString,
  )
  return (
    <div>
      {lengthBiggerThanZero(getToolbarItems(toolbar, withSettings)) && (
        <Toolbar
          renderActions={renderActions}
          toolbar={getToolbarItems(toolbar, withSettings)}
        />
      )}
      <StyledTableContainer>
        <StyledTable {...getTableProps()}>
          <StyledTableHead>
            {map(
              headerGroup => (
                <StyledHeaderRow {...headerGroup.getHeaderGroupProps()}>
                  {pipe(
                    prop('headers'),
                    map(column => (
                      <StyledTh
                        {...column.getHeaderProps(
                          column.getSortByToggleProps({ title: '' }),
                        )}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (
                            <StyledSortingIcon>
                              <StyledIcon
                                name={
                                  column.isSortedDesc
                                    ? 'angle-down'
                                    : 'angle-up'
                                }
                                size={12}
                              />
                            </StyledSortingIcon>
                          ) : (
                            ''
                          )}
                        </span>
                        <StyledResizer
                          {...column.getResizerProps()}
                          isResizing={column.isResizing}
                        />
                      </StyledTh>
                    )),
                  )(headerGroup)}
                </StyledHeaderRow>
              ),
              headerGroups,
            )}
          </StyledTableHead>
          {renderTableBody({ loading, rows })}
        </StyledTable>
      </StyledTableContainer>
      {renderPagination(pagination)}
      {renderSettings(withSettings)}
    </div>
  )
}

export default Table
