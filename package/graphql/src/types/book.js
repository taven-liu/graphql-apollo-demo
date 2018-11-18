export const typeDef = `
  extend type Query {
    book(id: Int!): Book
    books: [Book]
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
  Book: {
    author: ({ author }, args, { api }) => {
      return api.getAuthorById(author)
    }
  }
}
