import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './store'
import routes, { DEFAULT_ROUTE, menus } from './routes'
import App from 'modules/app'

export default () => (
  <Router history={history}>
    <Switch>
      <Route
        path='/'
        component={props => (
          <App
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
