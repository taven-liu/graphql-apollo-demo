import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { createActions } from 'redux-actions'
import { setContext } from 'apollo-link-context'
import fetch from 'utils/fetch'

export const { loginRequested, loginSucceeded, loginFailed } = createActions({
  LOGIN_REQUESTED: ({ username, password }) => ({ username, password }),
  LOGIN_SUCCEEDED: ({ username, token }) => ({ username, token }),
  LOGIN_FAILED: () => ({})
})

export const loginSaga = function*({ payload: { username, password } }) {
  try {
    yield call(() => {})
    yield delay(3000)
    const data = yield call(fetch, {
      url: '/token',
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    console.log('login data', data)
    const token = localStorage.setItem('auth_token', data.token)
    // Use the setContext method to set the HTTP headers.
    setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
    yield put(loginSucceeded({ username: username, token: password }))
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
