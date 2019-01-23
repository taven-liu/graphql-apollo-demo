import gql from 'graphql-tag'

export const GET_AUTHORS = gql`
  query($name: String) {
    authors(name: $name) {
      id
      firstName
      lastName
      books {
        id
        title
      }
    }
  }
`

export const GET_BOOK_STATUS = gql`
  query {
    _book @client {
      isEditMode
      isOpen
    }
  }
`
