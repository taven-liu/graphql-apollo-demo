import { handleActions } from 'redux-actions'
import loginReducerMap, { watchLogin } from './login'

export const sagaWatches = [watchLogin]

export default handleActions(
  {
    ...loginReducerMap
  },
  {
    username: null,
    isAuthenticating: false
  }
)
