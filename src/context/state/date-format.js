import { __, always, includes, unless } from 'ramda'

import ls from 'utils/ls'

const getDateFormat = ():
  | 'L'
  | 'l'
  | 'LL'
  | 'll'
  | 'LLL'
  | 'lll'
  | 'LLLL'
  | 'llll' => {
  const userDateFormat = ls.get('DATE_FORMAT')
  return unless(
    includes(__, ['L', 'l', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll']),
    always('lll'),
  )(userDateFormat)
}

const dateFormat = getDateFormat()

export default { dateFormat }
