export const typeDef = `
  extend type Query {
    author(id: Int!): Author
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`

export const resolvers = {
  Query: {
    author: (_, { id }, { api }) => {
      return api.getAuthorById(id)
    }
  },
  Author: {
    books: ({ books }, args, { api }) => {
      console.log(books)
      return api.batchGetBookByIds(books)
    },
  }
}
