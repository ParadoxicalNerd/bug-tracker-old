// import ticketModel, { ticketTypes, ticketPriority, ticketStatus } from '../models/ticket'
// import projectModel from '../models/project'
// import userModel, { userTypes, userSchema } from '../models/user'


import express from 'express'
import 'ts-mongoose/plugin'
import { ticketStatus, ticketModel, ticketPriority, ticketTypes } from '../models/ticket'
import assert from 'assert'
import { userModel, userTypes } from '../models/user'
import { projectModel } from '../models/project'

const app = express.Router()

app.get('/', async (req, res, next) => {
    async function a() {
        let user = await userModel.create({
            name: "Pankaj Meghani",
            type: userTypes.PROGRAMMER,
            ticketsFiled: [],
            ticketsClosed: [],
            ticketsAssigned: []
        })
        console.log(user.toObject())

        // return user.toObject()

        let project = await projectModel.create({
            name: "Bug Tracker",
            description: "A simple bug tracking application created for fun",
            createdBy: [user._id],
            associatedUsers: [user._id],
            tickets: []
        })
        console.log(project.toObject())

        // let project = (await projectModel.findOne({ name: "pizsdsa" }).exec())!
        // console.log(project.toObject())

        let ticket = await ticketModel.create({
            title: 'Create pahts',
            description: 'Create the required paths once the mongoose model is done',
            type: ticketTypes.BUG,
            priority: ticketPriority.UNKNOWN,
            status: ticketStatus.OPEN,
            project: project._id,
            createdBy: [user._id],
            assignedTo: [user._id]
        })

        user.ticketsAssigned.push(ticket._id)
        user.ticketsFiled.push(ticket._id)
        await user.save()

        console.log(ticket.toObject())

        let new_ticket = await ticketModel.find()
            .populate('project')
            .populate('assignedTo')
            .exec()

        console.log(new_ticket[0].toObject())
        return new_ticket[0].toObject()

        //  ==============================================

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


        // let temp = await tempModel.create({
        //     namea: "sd"
        // })
        // temp._id
        // console.log(temp)
        // let user = await userModel.create({
        //     name: "Pankaj",
        //     type: IuserTypes.programmer,
        //     ticketsAssigned: [temp._id, temp._id],
        //     ticketsClosed: [],
        //     ticketsFiled: []
        // })
        // console.log(user)
        // user.populate('ticketsAssigned', (err, user) => {
        //     user.ticketsAssigned
        //     // (<Array<ItempSchema>>user.ticketsAssigned)[9]._id
        //     // or

        //     // user.ticketsAssigned = (<Array<ItempSchema>>user.ticketsAssigned)
        //     // user.ticketsAssigned = user.ticketsAssigned
        //     console.log(user)
        //     return user.toObject()
        // })

    }
    res.status(200)
    let k = await a()
    res.send(k)
})

export default app