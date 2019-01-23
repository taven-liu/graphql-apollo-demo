import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Switch } from 'antd'
import { graphql, compose, withApollo } from 'react-apollo'
import DataTable from '../components/DataTable'
import QueryForm from '../components/QueryForm'
import CreateFormModal from '../components/CreateFormModal'
import { UPDATE_STATUS } from '../constants/mutations'
import { GET_BOOK_STATUS } from '../constants/queries'
import styles from './styles'

class Book extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    updateBookStatus: PropTypes.func
  }

  state = {
    variables: {},
    modalVisible: false,
    skip: true
  }

  handleSearch = values => {
    this.setState({ variables: values, skip: false })
  }

  handleCreate = values => {
    console.log('handleCreate values', values)
  }

  render() {
    console.log('Book props', this.props)
    const { variables, modalVisible, skip } = this.state
    const { data, updateBookStatus } = this.props
    const { _book } = data || {}
    const { isEditMode, isOpen } = _book || {}
    return (
      <Card bordered={false}>
        <div className={styles.actions}>
          <QueryForm onSearch={this.handleSearch} />
          <Button type="primary" onClick={() => this.setState({ modalVisible: true })}>
            Add user
          </Button>
        </div>
        <div>
          <h2>local state</h2>
          <Switch
            checked={isEditMode}
            onChange={checked => {
              updateBookStatus({ isEditMode: checked })
            }}
          />
          isEditMode: {`${isEditMode}`}
          <Switch
            checked={isOpen}
            onChange={checked => {
              updateBookStatus({ isOpen: checked })
            }}
          />
          isOpen: {`${isOpen}`}
        </div>
        <DataTable variables={variables} skip={skip} />
        <CreateFormModal
          modalVisible={modalVisible}
          onCreate={this.handleCreate}
          onCancel={() => {
            this.setState({ modalVisible: false })
          }}
        />
      </Card>
    )
  }
}

export default compose(
  withApollo,
  graphql(GET_BOOK_STATUS),
  graphql(UPDATE_STATUS, {
    props: ({ mutate }) => ({
      updateBookStatus: status => mutate({ variables: { status } })
    })
  })
)(Book)
