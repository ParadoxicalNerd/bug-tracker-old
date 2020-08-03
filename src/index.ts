import express from 'express'
import path from 'path'
import logger from 'morgan'
import createError from 'http-errors'
// import passport from 'passport'

require('dotenv').config()

// import { router as userRouter } from './routes/user'
import { router as ticketRoute } from './routes/ticket'
import example from './routes/exampleRoute'

import http from 'http'

import './database'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

console.log('Build completed successfully')

// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', example)
app.use('/tickets', ticketRoute)
// app.use('/users', userRouter)

app.use((req, res, next) => {
    next(createError(404))
})


const server = http.createServer(app)
server.listen(8000, 'localhost', () => {
    console.log('Server started at localhost:8000')
})