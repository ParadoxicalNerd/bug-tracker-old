import ticketModel, { ticketTypes, ticketPriority, ticketStatus } from '../models/ticket'
import projectModel from '../models/project'
import userModel, { userTypes, userSchema } from '../models/user'

import express from 'express'
import 'ts-mongoose/plugin'

const app = express.Router()

app.get('/', (req, res, next) => {
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
        // // console.log(ticket.toObject())
        let ticket = await ticketModel.find().populate ('project').exec()
        console.log(ticket[0].toObject())
        return ticket[0].toObject()
    }
    let k = a()
    res.json(k)
})

export default app