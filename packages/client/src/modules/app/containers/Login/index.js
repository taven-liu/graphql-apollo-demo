import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import { loginRequested } from '../../reducers/user/login'
import styles from './style'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    loginRequested: PropTypes.func,
    isAuthenticating: PropTypes.bool,
    location: PropTypes.object,
    username: PropTypes.string
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, { userName, password }) => {
      if (!err) {
        this.props.loginRequested({
          username: userName,
          password
        })
      }
    })
  }

  render() {
    const { isAuthenticating, form, username, location } = this.props
    const { getFieldDecorator } = form

    const { from } = location.state || { from: { pathname: '/' } }

    if (username) return <Redirect to={from} />

    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
            </FormItem>
            <Button loading={isAuthenticating} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const selectors = state => ({
  isAuthenticating: state.app.user.isAuthenticating,
  username: state.app.user.username
})

const actions = {
  loginRequested
}

export default Form.create()(
  connect(
    selectors,
    actions
  )(NormalLoginForm)
)
