// 方式一
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
      return api.book.getBookById(id)
    },
    books: (_, args, { api }) => {
      return api.book.listBooks()
    }
  },
  Mutation: {
    createBook: (_, { input }, { api }) => {
      return api.book.createBook(input)
    }
  },
  Book: {
    author: ({ author }, args, { api }) => {
      return api.author.getAuthorById(author)
    }
  }
}

// 方式二
// import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql'

// import { AuthorType } from './author'

// export const BookType = new GraphQLObjectType({
//   name: 'Book',
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLInt)
//     },
//     title: {
//       type: GraphQLString
//     },
//     author: {
//       type: AuthorType,
//       resolve: ({ author }, args, { api }) => {
//         return api.book.getAuthorById(author)
//       }
//     }
//   })
// })

// export const queries = {
//   book: {
//     type: BookType,
//     args: {
//       id: {
//         type: GraphQLInt
//       }
//     },
//     resolve: (_, { id }, { api }) => {
//       return api.book.getBookById(id)
//     }
//   },
//   books: {
//     type: new GraphQLList(BookType),
//     resolve: (_, args, { api }) => {
//       return api.book.listBooks()
//     }
//   }
// }
