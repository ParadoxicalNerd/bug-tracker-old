import { ticketModel, ticketPriority, ticketStatus, ticketTypes, ITicket } from '../models/ticket'
import { Types } from 'mongoose'
import { projectModel } from '../models/project'
import { userModel } from '../models/user'

import assert from 'assert'

class ticketService {
    async getAllTickets() {
        let ticket: any = null, error: any = null, statusCode: number

        try {
            const document = await ticketModel.find({})
                .populate('project', ['name', 'description'])
                .populate('createdBy', ['name', 'ofType'])
                .populate('assignedTo', ['name', 'ofType'])
                .exec()
            ticket = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            tickets: ticket,
            error,
            statusCode
        }
    }
    async createNewTicket(parameters: {
        title: String,
        description: String,
        type: string,
        priority?: string,
        status?: string,
        project: Types.ObjectId,
        createdBy: Types.ObjectId[],
        assignedTo: Types.ObjectId[],
    }) {

        let ticket: any = null, error: any = null, statusCode: number
        try {
            if (!parameters.priority) parameters.priority = "UNKNOWN"
            if (!parameters.status) parameters.status = "OPEN"

            const document = await ticketModel.create({
                title: parameters.title,
                description: parameters.description,
                ofType: ticketTypes[parameters.type as ticketTypes],
                priority: ticketPriority[parameters.priority as ticketPriority],
                status: ticketStatus[parameters.status as ticketStatus],
                project: parameters.project,
                createdBy: parameters.createdBy,
                assignedTo: parameters.assignedTo
            })
            await projectModel.findByIdAndUpdate(parameters.project, { $push: { tickets: document._id } }).exec()

            let uniqueUsers = parameters.createdBy.concat(
                parameters.assignedTo.filter((val) => (
                    parameters.createdBy.indexOf(val)
                ))
            )
            await userModel.update(
                { _id: { $in: uniqueUsers } },
                { $push: { tickets: document._id } },
                { multi: true }
            ).exec()

            ticket = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            ticket,
            error,
            statusCode
        }
    }

    async getOneTicket(parameters: {
        id: string
    }) {
        let ticket: any = null, error: any = null, statusCode: number
        try {
            ticket = await ticketModel.findById(parameters.id).exec()
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            ticket, error, statusCode
        }
    }

    async modifyOneTicket(parameters: {
        id: string,
        updates: {
            title?: String,
            description?: String,
            type?: string,
            priority?: string,
            status?: string,
            project?: Types.ObjectId,
            createdBy?: Types.ObjectId[],
            assignedTo?: Types.ObjectId[],
        }
    }) {
        let retTicket: any = null, error: any = null, statusCode: number
        try {
            let ticket = await ticketModel.findByIdAndUpdate(
                parameters.id,
                // @ts-ignore 
                { $set: { ...parameters.updates } },
                { new: false }
            ).exec()

            assert(ticket != null)

            // Switch position of tickets in between projects 
            if (parameters.updates.project) {
                // Removes ticket from the old project
                await projectModel.findOneAndUpdate({
                    _id: ticket.project
                }, {
                    $pull: {
                        tickets: ticket._id
                    }
                }).exec()

                // Add ticket to the new project
                await projectModel.findOneAndUpdate({
                    _id: parameters.updates.project
                }, {
                    $push: {
                        tickets: ticket._id
                    }
                }).exec()
            }

            // Switches the ticket between projects
            if (parameters.updates.createdBy || parameters.updates.assignedTo) {

                if (!parameters.updates.createdBy) parameters.updates.createdBy = []
                if (!parameters.updates.assignedTo) parameters.updates.assignedTo = []

                let newUniqueUsers = parameters.updates.createdBy.concat(
                    parameters.updates.assignedTo.filter((val) => (
                        parameters.updates.createdBy?.indexOf(val)
                    ))
                )

                let oldUniqueUsers = (ticket.createdBy as Types.ObjectId[]).concat(
                    (ticket.assignedTo as Types.ObjectId[]).filter((val) => (
                        (ticket?.createdBy as Types.ObjectId[])?.indexOf(val)
                    ))
                )

                // Removes user from the old project
                await userModel.update(
                    { _id: { $in: oldUniqueUsers } },
                    { $pull: { tickets: ticket._id } },
                    { multi: true }
                ).exec()

                // Add user to the new project
                await userModel.update(
                    { _id: { $in: newUniqueUsers } },
                    { $push: { tickets: ticket._id } },
                    { multi: true }
                ).exec()

            }

            statusCode = 200
            retTicket = ticket.toObject()
        } catch (err) {
            error = err
            statusCode = 500
        }
        return { ticket: retTicket, error, statusCode }
    }

    // async deleteOneTicket(parameters: {
    //     id: string
    // }) {
    //     let ticket: any = null, error: any = null, statusCode: number
    //     try {
    //         ticket = await ticketModel.findByIdAndDelete(parameters.id).exec()
    //         statusCode = 200
    //     } catch (err) {
    //         error = err
    //         statusCode = 500
    //     }
    //     return { ticket, error, statusCode }
    // }
}

export default new ticketService