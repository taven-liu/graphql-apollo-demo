import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import styles from './style'

const FormItem = Form.Item

class QueryForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    onSearch: PropTypes.func
  }

  handleSearch = e => {
    e.preventDefault()
    const { form, onSearch } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue
      }
      onSearch(values)
    })
  }

  handleFormReset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <div className={styles.row}>
          <FormItem label="name">{getFieldDecorator('name')(<Input placeholder="input user name" />)}</FormItem>
          <span className={styles.actions}>
            <Button type="primary" htmlType="submit">
              search
            </Button>
            <Button onClick={this.handleFormReset}>reset</Button>
          </span>
        </div>
      </Form>
    )
  }
}

export default Form.create()(QueryForm)
