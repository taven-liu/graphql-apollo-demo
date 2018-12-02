import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import { loginRequested } from '../reducers/login'
import styles from './style'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    loginRequested: PropTypes.func,
    isAuthenticating: PropTypes.bool
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
    const { isAuthenticating, form } = this.props
    const { getFieldDecorator } = form
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
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <Button
              loading={isAuthenticating}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const selectors = state => ({
  isAuthenticating: state.login.isAuthenticating
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
