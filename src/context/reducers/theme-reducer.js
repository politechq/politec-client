import { always, compose, cond, equals, prop, T } from 'ramda'

import { MEDIA_CHANGE, SET_THEME } from 'context/constants'

const themeReducer = (state, action) =>
  compose(
    cond([
      [equals(MEDIA_CHANGE), always({ ...state, theme: action.theme })],
      [equals(SET_THEME), always({ ...state, theme: action.theme })],
      [T, always(state)],
    ]),
    prop('type'),
  )(action)

export default themeReducer
