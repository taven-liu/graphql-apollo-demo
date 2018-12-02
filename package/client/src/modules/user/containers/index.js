import React from 'react'
import { Card, Button } from 'antd'
import DataTable from '../components/DataTable'
import QueryForm from '../components/QueryForm'
import CreateFormModal from '../components/CreateFormModal'
import styles from './styles'

export default class extends React.PureComponent {
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
    const { variables, modalVisible, skip } = this.state
    return (
      <Card bordered={false}>
        <div className={styles.actions}>
          <QueryForm onSearch={this.handleSearch} />
          <Button type="primary" onClick={() => this.setState({ modalVisible: true })}>
            Add user
          </Button>
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
