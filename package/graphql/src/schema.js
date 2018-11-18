import R, { mergeDeepLeft } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'
import {
  typeDef as Author,
  resolvers as authorResolvers,
} from './types/author.js';
import {
  typeDef as Book,
  resolvers as bookResolvers,
} from './types/book.js';

const Query = `
  type Query {
    _empty: String
  }
`

export default makeExecutableSchema({
  typeDefs: [ Query, Book, Author ],
  resolvers: R.mergeDeepLeft(authorResolvers, bookResolvers)
});
