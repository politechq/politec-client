import { always, cond, equals } from 'ramda'

const getCurrencySymbol = cond([
  [equals('USD'), always('$')],
  [equals('EUR'), always('€')],
  [equals('RUB'), always('₽')],
])

export default getCurrencySymbol
