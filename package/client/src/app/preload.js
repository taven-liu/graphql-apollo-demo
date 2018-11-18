import { put, take } from 'redux-saga/effects'
import { updateAppStatusRequested } from 'modules/app/reducers/status/update'
export function * preload () {
  yield put(updateAppStatusRequested())
}
