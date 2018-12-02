import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import express from 'express'
import jwt from 'express-jwt'
import cors from 'cors'
import configureTokenRoute from './api/token'
import config from './config'
import { getJwtToken } from './utils/auth'
import api from './api'
import schema from './schema'

const server = new ApolloServer({
  schema,
  formatError: error => {
    console.log('error---\n', error)
    return {
      message: error.message,
      stack: error.stack.split('\n')
    }
  },
  context: ({ req }) => {
    const user = req.user

    if (user) {
      user.token = getJwtToken(req)
      user.name = user.username
    } else {
      // throw new AuthenticationError('未登录')
    }
    console.log('user\n', user)
    return {
      user,
      api
    }
  }
})

const app = express()

const jwtMiddleware = jwt({
  secret: config.token.secret,
  credentialsRequired: false,
  requestProperty: 'user'
})

app.use(jwtMiddleware, (err, req, res, next) => {
  console.log('----\n', req.user)
  console.log('err\n', err)
  if (err instanceof jwtMiddleware.UnauthorizedError) {
    res.sendStatus(401)
  } else {
    next(err)
  }
})

app.use('/token', configureTokenRoute(api))

server.applyMiddleware({ app })

app.get('*', function(req, res) {
  res.sendStatus(404)
})

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
)
