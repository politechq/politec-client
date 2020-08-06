import {
  always,
  applyTo,
  compose,
  either,
  equals,
  identity,
  ifElse,
  prop,
  unless,
} from 'ramda'

import ls from 'utils/ls'

const getTheme = (): 'dark' | 'light' => {
  const userTheme = ls.get('THEME')
  return unless(either(equals('light'), equals('dark')), () =>
    compose(
      ifElse(identity, always('dark'), always('light')),
      prop('matches'),
      applyTo('(prefers-color-scheme: dark)'),
      prop('matchMedia'),
    )(window),
  )(userTheme)
}

const theme = getTheme()

export default { theme }
