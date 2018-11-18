import { channel } from 'redux-saga'
import { put, take } from 'redux-saga/effects'

export const sagaActionChannel = channel()

function * watchSagaActionChannel () {
  while (true) {
    const action = yield take(sagaActionChannel)
    yield put(action)
  }
}

export default [
  watchSagaActionChannel
]
