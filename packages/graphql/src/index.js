import { ApolloServer /* AuthenticationError */ } from 'apollo-server-express'
import express from 'express'
import jwt from 'express-jwt'
import cors from 'cors'
import configureTokenRoute from './tokenRoute'
import config from 'config/config'
import morgan from 'morgan'
import { getJwtToken } from './utils/auth'
import api from './api'
import schema from './schema'

const server = new ApolloServer({
  schema,
  formatError: error => {
    console.log('error', error)
    return {
      message: error.message,
      stack: error.stack.split('\n')
    }
  },
  context: ({ req }) => {
    const user = req.user
    // TODO authentication
    if (user) {
      user.token = getJwtToken(req)
      user.name = user.username
    } else {
      //   throw new AuthenticationError('未登录')
    }
    return {
      user,
      api
    }
  }
})

const app = express()
app.use(morgan('combined'))

app.use(cors())
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', ['http://localhost:4300'])
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

const jwtMiddleware = jwt({
  secret: config.token.secret.public,
  credentialsRequired: false,
  requestProperty: 'user'
})

app.use(jwtMiddleware, (err, req, res, next) => {
  if (err instanceof jwtMiddleware.UnauthorizedError) {
    res.sendStatus(401)
  } else {
    next(err)
  }
})

app.use('/token', configureTokenRoute())

app.get('/users', async (req, res) => {
  const users = await api.user.listUsers()
  res.status(200).json(users)
})

server.applyMiddleware({ app })

app.get('*', function(req, res) {
  res.sendStatus(404)
})

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
)
