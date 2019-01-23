import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql'

import Author from './author'

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: GraphQLString
    },
    author: {
      type: Author,
      resolve: ({ author }, args, { api }) => {
        return api.getAuthorById(author)
      }
    }
  })
})

export default BookType

export const queries = {
  book: {
    type: BookType,
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: (_, { id }, { api }) => {
      return api.getBookById(id)
    }
  },
  books: {
    type: new GraphQLList(BookType),
    resolve: (_, args, { api }) => {
      return api.getBooks()
    }
  }
}

export const typeDef = `
  input createBookInput {
    title: String
    author: Int
  }

  extend type Query {
    book(id: Int!): Book
    books: [Book]
  }

  extend type Mutation {
    createBook(input: createBookInput): Book
  }

  type Book {
    id: Int!
    title: String
    author: Author
  }
`

export const resolvers = {
  Query: {
    book: (_, { id }, { api }) => {
      return api.getBookById(id)
    },
    books: (_, args, { api }) => {
      return api.getBooks()
    }
  },
  Mutation: {
    createBook: (_, { input }, { api }) => {
      return api.createBook(input)
    }
  },
  Book: {
    author: ({ author }, args, { api }) => {
      return api.getAuthorById(author)
    }
  }
}
