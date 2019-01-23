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
