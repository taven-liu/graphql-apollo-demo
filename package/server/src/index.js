import express from 'express'
import morgan from 'morgan'
import api from './api'
import { PORT } from './config'

const app = express()

app.use(morgan('dev'))
app.use('/api', api)

app.listen(PORT, () => {
  console.log('api serve running at %s', PORT)
})
