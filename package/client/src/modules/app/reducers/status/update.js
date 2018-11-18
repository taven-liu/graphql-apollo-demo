import { createActions } from 'redux-actions'
import { put, call, takeEvery, delay } from 'redux-saga/effects'

export const {
 updateAppStatusRequested,
 updateAppStatusSucceeded
} = createActions({
  UPDATE_APP_STATUS_REQUESTED: () =>  {},
  UPDATE_APP_STATUS_SUCCEEDED: ({ loading }) => ({ loading })
})

export const updateSaga = function * () {
  console.log('doing update saga...')
  yield delay(5000)
  console.log('do update saga completed')
  yield put(updateAppStatusSucceeded({ loading: false }))
}

export const watchUpdate = function * () {
  yield takeEvery(updateAppStatusRequested, updateSaga)
}

export default {
  [updateAppStatusRequested]: (state) => {
    return {
      ...state,
      loading: true
    }
  },
  [updateAppStatusSucceeded]: (state, { payload: { loading }}) => {
    return {
      ...state,
      loading
    }
  }
}
