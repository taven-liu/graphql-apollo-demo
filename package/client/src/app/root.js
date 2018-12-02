import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './store'
import routes, { DEFAULT_ROUTE, menus } from './routes'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from './session/auth'
import App from 'modules/app'
import Login from 'modules/login'

const LoginComponent = userIsNotAuthenticatedRedir(Login)
const AppComponent = userIsNotAuthenticatedRedir(App)

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={LoginComponent} />
      <Route
        path="/"
        component={props => (
          <AppComponent
            {...props}
            routes={routes}
            menus={menus}
            defaultRoute={DEFAULT_ROUTE}
          />
        )}
      />
    </Switch>
  </Router>
)
