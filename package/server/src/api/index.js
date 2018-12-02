import express from 'express'
import bodyParser from 'body-parser'
import { getAuthors } from './author'

const api = express.Router()

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
api.use(bodyParser.json())

api.get('/authors', getAuthors)

export default api
