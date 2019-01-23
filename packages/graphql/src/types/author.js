import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql'

import Book from './book'

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    books: {
      type: new GraphQLList(Book),
      resolve: ({ books }, args, { api }) => {
        return api.batchGetBookByIds(books)
      }
    }
  })
})

export default AuthorType

export const queries = {
  author: {
    type: AuthorType,
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: (_, { id }, { api }) => {
      console.log(id)
      return api.getAuthorById(id)
    }
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve: (_, args, { api }) => {
      return api.getAuthors()
    }
  }
}

// const createAuthorInput = new GraphQLInputObjectType({

// })

export const mutations = {
  createAuthor: {
    type: AuthorType,
    args: {
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      books: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    resolve: (_, args, { api }) => {
      return api.createAuthor(args)
    }
  }
}

export const typeDef = `
  input createAuthorInput {
    firstName: String!
    lastName: String!
    books: [Int]
  }

  extend type Query {
    author(id: Int!): Author
    authors(name: String): [Author]
  }

  extend type Mutation {
    createAuthor(input: createAuthorInput): Author
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
    },
    authors: (parent, { name }, { api }) => {
      return api.getAuthors(name)
    }
  },
  Mutation: {
    createAuthor: (_, { input }, { api }) => {
      console.log('---\n', input)
      return api.createAuthor(input)
    }
  },
  Author: {
    books: ({ books }, args, { api }) => {
      return api.batchGetBookByIds(books)
    }
  }
}
