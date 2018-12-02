import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import Login from 'modules/login'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => {
    console.log(state)
    return state.login.username !== null
  },
  authenticatingSelector: state => state.login.isAuthenticating,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  // AuthenticatingComponent: Login,
  redirectPath: '/login'
})

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state => {
    console.log('---', state)
    return state.login.username === null && state.login.isAuthenticating === false
  },
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => {
    console.log('userIsNotAuthenticatedRedir', state, ownProps)
    return locationHelper.getRedirectQueryParam(ownProps) || '/'
  },
  allowRedirectBack: false
})
