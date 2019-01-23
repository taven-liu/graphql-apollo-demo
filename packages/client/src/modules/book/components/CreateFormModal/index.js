import React from 'react'
import { Mutation } from 'react-apollo'
import { Modal, Form, Input, message } from 'antd'
import { CREATE_AUTHOR } from '../../constants/mutations'
import { GET_AUTHORS } from '../../constants/queries'

const FormItem = Form.Item

export default Form.create()(props => {
  const { modalVisible, form, onCancel } = props
  const okHandle = createAuthor => {
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return
      createAuthor({
        variables: { input: fieldsValue },
        update: (store, { data: { createAuthor } }) => {
          const data = store.readQuery({ query: GET_AUTHORS })
          data.authors.push(createAuthor)
          store.writeQuery({ query: GET_AUTHORS, data })
        }
      })
    })
  }

  const completedHandle = ({ createAuthor }) => {
    message.success(`Create user successfully, id ${createAuthor.id}`)
    onCancel()
  }

  return (
    <Mutation mutation={CREATE_AUTHOR} onCompleted={completedHandle}>
      {(createAuthor, { data, loading }) => (
        <Modal
          title="Add user"
          visible={modalVisible}
          confirmLoading={loading}
          onOk={() => okHandle(createAuthor)}
          onCancel={onCancel}
        >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="first name">
            {form.getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input first name' }]
            })(<Input placeholder="first name" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="last name">
            {form.getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input last name' }]
            })(<Input placeholder="last name" />)}
          </FormItem>
        </Modal>
      )}
    </Mutation>
  )
})
