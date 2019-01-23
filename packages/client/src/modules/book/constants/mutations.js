import gql from 'graphql-tag'

export const CREATE_AUTHOR = gql`
  mutation createAuthor($input: createAuthorInput) {
    createAuthor(input: $input) {
      __typename
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

export const UPDATE_STATUS = gql`
  mutation updateBookStatus($status: Object) {
    updateBookStatus(status: $status) @client
  }
`
