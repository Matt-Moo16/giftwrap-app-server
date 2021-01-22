require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const giftsRouter = require('./gifts/gifts-router')
const namesRouter = require('./names/names-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/user-router')
const errorHandler = require('./error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/gifts', giftsRouter)
app.use('/api/names', namesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)


module.exports = app