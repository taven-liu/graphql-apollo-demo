import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from './store'
import routes, { DEFAULT_ROUTE, menus } from './routes'
import { LOGIN } from 'constants/routes'
import { App, Login } from 'modules/app'

class Root extends React.PureComponent {
  render() {
    const { username } = this.props
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route
            path="/"
            component={props => {
              if (username) {
                return <App {...props} routes={routes} menus={menus} defaultRoute={DEFAULT_ROUTE} />
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: LOGIN,
                      state: { from: props.location }
                    }}
                  />
                )
              }
            }}
          />
        </Switch>
      </Router>
    )
  }
}

const selectors = state => ({
  username: state.app.user.username
})

export default connect(selectors)(Root)
