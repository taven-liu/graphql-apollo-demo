import { handleActions } from 'redux-actions'
import updateReducerMap, { watchUpdate } from './update'

export const watchStatusSagas = [
  watchUpdate
]

export default handleActions({
  ...updateReducerMap
}, {
})
