import dateFormatReducer from './date-format-reducer'
import themeReducer from './theme-reducer'

const rootReducer = (...reducers) => (state, action) =>
  reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)

export default rootReducer(dateFormatReducer, themeReducer)
