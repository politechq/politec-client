import React, { useState } from 'react'
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  always,
  applyTo,
  curry,
  curryN,
  divide,
  equals,
  filter,
  find,
  findIndex,
  flip,
  gte,
  head,
  ifElse,
  inc,
  lt,
  lte,
  map,
  multiply,
  or,
  pipe,
  prop,
  toLower,
  toString,
  xor,
} from 'ramda'
import { ceil, concatAll, isTrue, mapIndexed } from 'ramda-adjunct'
import { alwaysEmptyString, replicate } from 'ramda-extension'

import {
  StyledIcon,
  StyledPage,
  StyledPages,
  StyledPageSelection,
  StyledPagination,
  StyledSelect,
  StyledTableInfo,
  StyledTableRecords,
} from './style'

const Pagination = ({
  limit,
  loading,
  offset,
  pageSizes,
  refetch,
  resetSorting,
  setLimit,
  setOffset,
  total,
}) => {
  const { t } = useTranslation()
  const getPageSizes = pipe(
    curry((totalRecords, pageSizesList) =>
      filter(
        currentSize =>
          or(lt(currentSize, totalRecords), equals('all', currentSize)),
        pageSizesList,
      ),
    ),
    map(currentSize => ({
      name: currentSize === 'all' ? t('all') : toString(currentSize),
      value: currentSize,
    })),
  )
  const getDefaultPageSize = curry((totalPages, pageSizeList, pageLimit) =>
    pipe(
      () => getPageSizes(totalPages, pageSizeList),
      ifElse(
        () =>
          lte(
            findIndex(({ value }) => equals(value, 'all'), pageSizeList),
            0,
          ) && equals(totalPages, pageLimit),
        find(({ value }) => equals('all', value)),
        head,
      ),
      prop('value'),
    ),
  )
  const [pageSize, setPageSize] = useState(
    getDefaultPageSize(total, pageSizes, limit),
  )
  const getRecordsInfo = curry((pageOffset, pageLimit, totalRecords) =>
    concatAll([
      `${t('records')} `,
      ifElse(equals('all'), always('1'), always(toString(inc(pageOffset))))(
        pageLimit,
      ),
      '-',
      ifElse(
        equals('all'),
        always(toString(totalRecords)),
        always(
          ifElse(
            gte(multiply(inc(pageOffset), pageLimit)),
            always(toString(totalRecords)),
            always(toString(multiply(inc(pageOffset), pageLimit))),
          )(totalRecords),
        ),
      )(pageLimit),
      ` ${toLower(t('from'))} `,
      toString(totalRecords),
    ]),
  )
  const renderPageList = pipe(
    ifElse(
      curry((recordsPerPage, totalRecords) =>
        lte(totalRecords, recordsPerPage),
      ),
      alwaysEmptyString,
      pipe(
        curry((recordsPerPage, totalRecords) =>
          divide(totalRecords, recordsPerPage),
        ),
        ceil,
        curry(numOfPages => (
          <StyledPages>
            {mapIndexed(
              flip(index => (
                <StyledPage
                  isActive={equals(index, divide(offset, limit))}
                  key={`page-${inc(index)}`}
                  onClick={() => {
                    resetSorting()
                    setOffset(multiply(index, limit))
                  }}
                >
                  {inc(index)}
                </StyledPage>
              )),
              replicate(numOfPages, null),
            )}
          </StyledPages>
        )),
      ),
    ),
  )
  const renderPageSelection = (totalRecords, sizes, sizeValue) => (
    <StyledPageSelection>
      <span>{t('per-page')}</span>
      <StyledSelect
        onChange={(event, value) => {
          resetSorting()
          setPageSize(value)
          setOffset(0)
          setLimit(value === 'all' ? totalRecords : value)
        }}
        options={getPageSizes(totalRecords, sizes)}
        showIcon={false}
        value={sizeValue}
      />
    </StyledPageSelection>
  )
  const callIf = curryN(2, isNotLoaded =>
    ifElse(always(isTrue(isNotLoaded)), alwaysEmptyString, applyTo(null)),
  )(loading)
  const callIfHasRecords = callIf(xor(loading, lt(0, total)))
  return (
    <StyledPagination>
      <StyledTableInfo>
        <StyledIcon
          data-tip={t('refresh-data')}
          name={'sync'}
          onClick={() => {
            resetSorting()
            refetch()
          }}
          size={16}
        />
        <StyledTableRecords>
          {callIfHasRecords(() => getRecordsInfo(offset, limit, total))}
        </StyledTableRecords>
      </StyledTableInfo>
      {callIfHasRecords(() => renderPageList(limit, total))}
      {callIfHasRecords(() => renderPageSelection(total, pageSizes, pageSize))}
    </StyledPagination>
  )
}

Pagination.propTypes = {
  limit: number,
  loading: bool,
  offset: number,
  pageSizes: arrayOf(oneOfType([string, number])),
  refetch: func,
  resetSorting: func,
  setLimit: func,
  setOffset: func,
  total: number,
}

export default Pagination
