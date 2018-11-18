import { combineReducers } from 'redux'
import statusReducer, { watchStatusSagas } from './status'

export const watchAppSagas = [
  ...watchStatusSagas
]

export default combineReducers({
  status: statusReducer
})
