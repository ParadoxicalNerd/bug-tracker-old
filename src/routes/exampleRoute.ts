// import ticketModel, { ticketTypes, ticketPriority, ticketStatus } from '../models/ticket'
// import projectModel from '../models/project'
// import userModel, { userTypes, userSchema } from '../models/user'

import { userModel, tempModel, IuserTypes, ItempSchema, tempSchema } from '../tmp/new2'
import express from 'express'
import 'ts-mongoose/plugin'
import { ticketStatus } from '../models/ticket'
import assert from 'assert'
const app = express.Router()

app.get('/', async (req, res, next) => {
    async function a() {
        // let user = await userModel.create({
        //     name: "asddfaPan",
        //     userType: userTypes.PROGRAMMER,
        // })
        // // console.log(user.toObject())
        // let project = await projectModel.create({
        //     name: "pizsddas fasdfasdsa",
        //     createdBy: [user._id]
        // })
        // // let project = (await projectModel.findOne({ name: "pizsdsa" }).exec())!
        // // console.log(project.toObject())
        // let ticket = await ticketModel.create({
        //     title: 'Working with dsdexamples',
        //     description: 'Create new example',
        //     type: ticketTypes.BUG,
        //     priority: ticketPriority.UNKNOWN,
        //     status: ticketStatus.OPEN,
        //     project: project._id,
        //     createdBy: user._id
        // })
        // // console.log(ticket.toObject())\

        // let ticket = await ticketModel.find().populate('project').exec()
        // console.log(ticket[0].toObject())
        // return ticket[0].toObject()

        // let temp = await tempModel.create({
        //     namea: "sd"
        // })
        // console.log(temp)
        // let user = await userModel.create({
        //     name: "Pankaj",
        //     type: IuserTypes.programmer,
        //     ticketsAssigned: [temp._id],
        //     ticketsClosed: [],
        //     ticketsFiled: []
        // })
        // console.log(user)
        // user.ticketsFiled[0].
        // return user.toObject()


        let temp = await tempModel.create({
            namea: "sd"
        })
        temp._id
        console.log(temp)
        let user = await userModel.create({
            name: "Pankaj",
            type: IuserTypes.programmer,
            ticketsAssigned: [temp._id, temp._id],
            ticketsClosed: [],
            ticketsFiled: []
        })
        console.log(user)
        user.populate('ticketsAssigned', (err, user) => {
            user.ticketsAssigned
            // (<Array<ItempSchema>>user.ticketsAssigned)[9]._id
            // or

            // user.ticketsAssigned = (<Array<ItempSchema>>user.ticketsAssigned)
            // user.ticketsAssigned = user.ticketsAssigned
            console.log(user)
            return user.toObject()
        })

    }
    let k = await a()
    res.send(k)
})

export default app