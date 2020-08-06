import moment from 'moment'

import { add, curry, multiply } from 'ramda'

import ls from 'utils/ls'

const formatDate = curry((language: 'en' | 'ru', timestamp: number): string => {
  const offset: number = new Date().getTimezoneOffset()
  return moment(add(timestamp, multiply(offset, -60000)))
    .locale(language)
    .format(ls.get('DATE_FORMAT', 'lll'))
})

export default formatDate
