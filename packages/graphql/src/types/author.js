// 方式一
export const typeDef = `
  input createAuthorInput {
    firstName: String!
    lastName: String!
    books: [Int]
  }

  extend type Query {
    author(id: Int!): Author
    authors(pageInfo: PaginationInput, name: String): AuthorConnection
  }

  extend type Mutation {
    createAuthor(input: createAuthorInput): Author
  }

  input PaginationInput {
    offset: Int!
    limit: Int!
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }

  type AuthorConnection {
    pageInfo: Pagination!
    items: [Author]
  }

  type Pagination {
    hasNext: Boolean!
    hasPrevious: Boolean!
    totalCount: Int!
    currentOffset: Int!
  }
`

export const resolvers = {
  Query: {
    author: (_, { id }, { api }) => {
      return api.author.getAuthorById(id)
    },
    authors: (_, { pageInfo, name }, { api }) => {
      return api.author.listAuthors(pageInfo, name)
    }
  },
  Mutation: {
    createAuthor: (_, { input }, { api }) => {
      return api.author.createAuthor(input)
    }
  },
  Author: {
    books: ({ books }, args, { api }) => {
      return api.book.batchGetBookByIds(books)
    }
  }
}

// 方式二
// import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql'

// import { BookType } from './book'
// export const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLInt)
//     },
//     firstName: {
//       type: GraphQLString
//     },
//     lastName: {
//       type: GraphQLString
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: ({ books }, args, { api }) => {
//         return api.author.batchGetBookByIds(books)
//       }
//     }
//   })
// })

// export const queries = {
//   author: {
//     type: AuthorType,
//     args: {
//       id: {
//         type: GraphQLInt
//       }
//     },
//     resolve: (_, { id }, { api }) => {
//       console.log(id)
//       return api.author.getAuthorById(id)
//     }
//   },
//   authors: {
//     type: new GraphQLList(AuthorType),
//     resolve: (_, args, { api }) => {
//       return api.author.listAuthors()
//     }
//   }
// }

// export const mutations = {
//   createAuthor: {
//     type: AuthorType,
//     args: {
//       firstName: {
//         type: GraphQLString
//       },
//       lastName: {
//         type: GraphQLString
//       },
//       books: {
//         type: new GraphQLList(GraphQLInt)
//       }
//     },
//     resolve: (_, args, { api }) => {
//       return api.author.createAuthor(args)
//     }
//   }
// }
