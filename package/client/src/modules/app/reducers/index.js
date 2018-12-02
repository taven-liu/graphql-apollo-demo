import { combineReducers } from 'redux'
import statusReducer, { watchStatusSagas } from './status'

export const sagas = [...watchStatusSagas]

export default combineReducers({
  status: statusReducer
})
