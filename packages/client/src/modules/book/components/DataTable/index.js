import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GET_AUTHORS } from '../../constants/queries'
import styles from './style.css'

class DataTable extends React.PureComponent {
  static propTypes = {
    variables: PropTypes.object,
    skip: PropTypes.bool,
    data: PropTypes.object
  }
  render() {
    console.log('book props', this.props)
    const {
      data: { loading, error, authors }
    } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :{JSON.stringify(error)}</p>
    if (authors) {
      return (
        <div>
          {authors.map(({ id, firstName, lastName, books }) => {
            return (
              <div key={id} className={styles.author}>
                <h2>Author: {id}</h2>
                <p>
                  <span>firstName: {firstName}</span>&nbsp;&nbsp;&nbsp;
                  <span>lastName: {lastName}</span>
                </p>
                {books.map(({ id: bookId, title }) => (
                  <div key={bookId} className={styles.book}>
                    <h3>book: {bookId}</h3>
                    <p>bookId: {bookId}</p>
                    <p>title: {title}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default graphql(GET_AUTHORS, {
  options: props => {
    console.log('---', props)
    const { skip, variables } = props
    return {
      variables: props.variables,
      skip
    }
  }
})(DataTable)
