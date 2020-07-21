import express from 'express'
import path from 'path'
import logger from 'morgan'
import createError from 'http-errors'

import './database'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    next(createError(404))
})
