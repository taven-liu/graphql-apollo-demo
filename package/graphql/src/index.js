import { ApolloServer, gql } from 'apollo-server'
import api from './api'
import schema from './schema'

const server = new ApolloServer({
  schema,
  context: () => {
    return {
      api
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
