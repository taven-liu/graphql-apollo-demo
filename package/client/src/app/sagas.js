import { all, call } from 'redux-saga/effects'
import watchChannelSagas from './channels'
import { sagas as appSagas } from 'modules/app'
import { sagas as loginSagas } from 'modules/login'

export { preload } from './preload'

export const sagas = function* rootSaga() {
  yield all([...watchChannelSagas, ...appSagas, ...loginSagas].map(call))
}
