// 方式一
import { makeExecutableSchema } from 'graphql-tools'
import * as R from 'ramda'
import { typeDef as Author, resolvers as authorResolvers } from './types/author.js'
import { typeDef as Book, resolvers as bookResolvers } from './types/book.js'

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

// 方式二

// import { GraphQLSchema, GraphQLObjectType } from 'graphql'
// import { queries as authorQueries, mutations as authorMutations } from './types/author.js'
// import { queries as bookQueries } from './types/book.js'

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
