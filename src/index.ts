import express from 'express'
import path from 'path'
import logger from 'morgan'
import createError from 'http-errors'
import ticketModel, { ticketTypes, ticketPriority, ticketStatus } from './models/ticket'
import projectModel from './models/project'
import userModel, { userTypes, userSchema } from './models/user'

import http from 'http'

import databaseInit from './database'; databaseInit();

import { getName } from '@typegoose/typegoose'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

console.log('dsahfjkhas')

app.use('/', (req, res, next) => {
    console.log(getName(userSchema))
    async function a() {
        // let user = await userModel.create({
        //     name: "Pan",
        //     userType: userTypes.PROGRAMMER,
        // })
        // console.log(user.toObject())
        // let project = await projectModel.create({
        //     name: "pizsdsa",
        //     createdBy: [user._id]
        // })
        let project = (await projectModel.findOne({ name: "pizsdsa" }).exec())!
        console.log(project.toObject())
        let ticket = await ticketModel.create({
            type: ticketTypes.BUG,
            priority: ticketPriority.UNKNOWN,
            status: ticketStatus.OPEN,
            project: project._id
        })
        console.log(ticket.toObject())
    }
    a()
    res.send({ response: 'okay' })
})

app.use((req, res, next) => {
    next(createError(404))
})


const server = http.createServer(app)
server.listen(8000, 'localhost', () => {
    console.log('Server started at localhost:8000')
})