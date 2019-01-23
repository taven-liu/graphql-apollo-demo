import { combineReducers } from 'redux'
import statusReducer, { sagaWatches as statusSagaWatches } from './status'
import userReducer, { sagaWatches as userSagaWatches } from './user'

export const sagas = [...statusSagaWatches, ...userSagaWatches]

export default combineReducers({
  status: statusReducer,
  user: userReducer
})
