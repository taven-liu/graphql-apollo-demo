import { handleActions } from 'redux-actions'
import updateReducerMap, { watchUpdate } from './update'

export const sagaWatches = [watchUpdate]

export default handleActions(
  {
    ...updateReducerMap
  },
  {}
)
