import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema, GraphQLObjectType, GraphQLInt } from 'graphql'
import R from 'ramda'
import AuthorType, {
  queries as authorQueries,
  mutations as authorMutations,
  typeDef as Author,
  resolvers as authorResolvers
} from './types/author.js'
import BookType, {
  queries as bookQueries,
  typeDef as Book,
  resolvers as bookResolvers
} from './types/book.js'

// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       ...authorQueries,
//       ...bookQueries
//     }
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       ...authorMutations
//     }
//   })
// })

const Query = `
  type Query {
    _empty: String
  }
`

const Mutation = `
  type Mutation {
    _empty: String
  }
`

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, Book, Author],
  resolvers: R.mergeDeepLeft(authorResolvers, bookResolvers)
})
