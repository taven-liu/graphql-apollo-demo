import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { matchPath } from 'react-router'
import { Layout, Menu, Icon, Button } from 'antd'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import styles from './style'

const { Header, Sider, Content } = Layout
const { SubMenu, Item } = Menu

class App extends React.PureComponent {
  static propTypes = {
    defaultRoute: PropTypes.string.isRequired,
    routes: PropTypes.object,
    menus: PropTypes.array,
    location: PropTypes.object
  }

  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  getMenuItemContent = (icon, displayName) => {
    return (
      <React.Fragment>
        {icon && <Icon type={icon} />}
        <span>{displayName}</span>
      </React.Fragment>
    )
  }

  getMenuItemPath = item => {
    const { displayName, icon, to } = item
    if (/^https?:\/\//.test(to)) {
      return (
        <a href={to} target="blank">
          {this.getMenuItemContent(icon, displayName)}
        </a>
      )
    }
    return (
      <Link to={to} replace={to === this.props.location.pathname}>
        {this.getMenuItemContent(icon, displayName)}
      </Link>
    )
  }

  renderMenu = menu => {
    const { displayName, icon, to, children = [] } = menu
    if (children.length > 0) {
      return (
        <SubMenu key={to || displayName} title={<span>{this.getMenuItemContent(icon, displayName)}</span>}>
          {children.map(item => this.renderMenu(item))}
        </SubMenu>
      )
    } else {
      return <Item key={to}>{this.getMenuItemPath(menu)}</Item>
    }
  }

  getAllMenuPaths = () => {
    const { menus } = this.props
    const paths = []
    const getMenuPaths = menu => {
      const { to, children = [] } = menu
      if (children.length > 0) {
        return children.map(item => getMenuPaths(item))
      } else {
        return paths.push(to)
      }
    }
    menus.forEach(menu => {
      getMenuPaths(menu)
    })
    return paths
  }

  getMenuSelectedKeys = () => {
    const { defaultRoute, location } = this.props
    const keys = this.getAllMenuPaths()
    const selectedKey = keys.filter(key => matchPath(key, { path: location.pathname }))
    return selectedKey.length > 0 ? selectedKey : [defaultRoute]
  }

  render() {
    const { defaultRoute, routes, menus } = this.props
    const { collapsed } = this.state
    return (
      <Layout className={styles.layout}>
        <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}>
            <span className={styles.icon} />
            <span
              className={classnames(styles.title, {
                [styles.collapsed]: collapsed
              })}
            >
              Hello graphQL
            </span>
          </div>
          <Menu mode="inline" selectedKeys={this.getMenuSelectedKeys()} className={styles.menu}>
            {menus.map(menu => this.renderMenu(menu))}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Button onClick={this.toggle}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
          </Header>
          <Content className={styles.content}>
            <Switch>
              {Object.entries(routes).map(([path, component]) => (
                <Route path={path} component={component} key={path} />
              ))}
              <Redirect from="/" to={defaultRoute} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
