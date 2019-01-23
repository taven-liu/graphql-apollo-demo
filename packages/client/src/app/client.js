import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

const defaults = {
  _book: {
    __typename: 'BookModuleStatus',
    isEditMode: false,
    isOpen: true
  }
}

const cache = new InMemoryCache({
  // cacheRedirects:
})

const stateLink = withClientState({
  cache,
  defaults,
  resolvers: {
    Mutation: {
      updateBookStatus: (_, { status }, { cache }) => {
        cache.writeData({
          data: {
            _book: {
              __typename: 'BookModuleStatus',
              ...status
            }
          }
        })
        return null
      }
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink, httpLink])
})

export default client
