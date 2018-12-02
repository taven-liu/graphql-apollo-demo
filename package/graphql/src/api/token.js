import express from 'express'
import bodyParser from 'body-parser'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'

export default api => {
  const tokenRoute = express.Router()
  tokenRoute.use(bodyParser.urlencoded({ extended: false }))
  tokenRoute.use(bodyParser.json())

  tokenRoute.post('/', (req, res, next) => {
    const { username, password } = req.body
    const token = jsonwebtoken.sign(
      {
        username: username,
        password: password
      },
      config.token.secret,
      {
        expiresIn: config.token.expired
      }
    )
    res.json({
      username: username,
      token: token
    })
  })

  tokenRoute.all('/', function(req, res) {
    // Method not allowed.
    res.sendStatus(405)
  })

  tokenRoute.all('*', function(req, res) {
    // Not Found.
    res.sendStatus(404)
  })

  return tokenRoute
}
