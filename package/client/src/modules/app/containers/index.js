import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

class App extends React.PureComponent {
  static propTypes = {
    defaultRoute: PropTypes.string.isRequired,
    routes: PropTypes.object,
    menus: PropTypes.array,
  }

  render () {
    const {
      defaultRoute,
      routes,
      menus,
    } = this.props

    return (
      <div>
        <h1>Hello graphQL</h1>
        <div>
          {
            menus.map(menu => {
              return (
                <div key={menu}>
                  <Link to={menu}>{menu}</Link>
                </div>
              )
            })
          }
        </div>
        <Switch>
        {
          Object.entries(routes).map(([path, component]) => (
            <Route path={path} component={component} key={path} />
          ))
        }
        <Redirect from='/' to={defaultRoute} />
      </Switch>
      </div>
    )
  }
}

export default App
