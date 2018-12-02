import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { createActions } from 'redux-actions'
// import fetch from 'utils/fetch'

export const { loginRequested, loginSucceeded, loginFailed } = createActions({
  LOGIN_REQUESTED: ({ username, password }) => ({ username, password }),
  LOGIN_SUCCEEDED: ({ username, token }) => ({ username, token }),
  LOGIN_FAILED: () => ({})
})

export const loginSaga = function*({ payload: { username, password } }) {
  try {
    yield call(() => {})
    yield delay(3000)
    yield put(loginSucceeded({ username: username, token: password }))
    // yield call(fetch, {
    //   url: '/login',
    //   method: 'POST',
    //   body: JSON.stringify({ username, password })
    // })
  } catch (error) {}
}

export function* watchLogin() {
  yield takeEvery(loginRequested, loginSaga)
}

export default {
  [loginRequested]: state => {
    return {
      ...state,
      isAuthenticating: true
    }
  },
  [loginSucceeded]: (state, { payload: { username, token } }) => {
    return {
      ...state,
      isAuthenticating: false,
      username,
      token
    }
  },
  [loginFailed]: state => {
    return {
      ...state,
      isAuthenticating: true
    }
  }
}
