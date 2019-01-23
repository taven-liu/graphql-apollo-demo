import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { GET_AUTHORS } from '../../constants/queries'
import styles from './style.css'

export default class extends React.PureComponent {
  static propTypes = {
    variables: PropTypes.object,
    skip: PropTypes.bool
  }
  render() {
    const { variables, skip } = this.props
    return (
      <div>
        <Query skip={skip} variables={variables} query={GET_AUTHORS} fetchPolicy="network-only">
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :{JSON.stringify(error)}</p>
            if (!data) return <p>...</p>
            console.log(data)
            return (
              <div>
                {data.authors.map(({ id, firstName, lastName, books }) => {
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
          }}
        </Query>
      </div>
    )
  }
}
