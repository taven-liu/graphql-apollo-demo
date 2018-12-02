import { combineReducers } from 'redux'
import { reducer as appReducer } from 'modules/app'
import { reducer as loginReducer } from 'modules/login'

export default combineReducers({
  app: appReducer,
  login: loginReducer
})
