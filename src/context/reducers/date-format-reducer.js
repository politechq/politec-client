import { always, compose, cond, equals, prop, T } from 'ramda'

import { SET_DATE_FORMAT } from 'context/constants'

const dateFormatReducer = (state, action) =>
  compose(
    cond([
      [
        equals(SET_DATE_FORMAT),
        always({ ...state, dateFormat: action.dateFormat }),
      ],
      [T, always(state)],
    ]),
    prop('type'),
  )(action)

export default dateFormatReducer
