import Tickets, { ticketPriority, ticketStatus, ticketTypes } from '../models/ticket'
import 'ts-mongoose/plugin'
import { Types } from 'mongoose'

class ticketService {
    async getAllTickets() {
        let tickets: any = null, error: any = null, statusCode: number

        try {
            const document = await Tickets.find()
                .populateTs('project')
                .populateTs('createdBy')
                .populateTs('assignedTo')
                .exec()
            tickets = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            tickets,
            error,
            statusCode
        }
    }
    async createNewTicket(parameters: {
        title: String,
        description: String,
        type: ticketTypes,
        priority: ticketPriority,
        status: ticketStatus,
        project: Types.ObjectId,
        createdBy: Types.ObjectId,
        assignedTo?: Types.ObjectId,
    }) {
        let ticket: any = null, error: any = null, statusCode: number
        try {
            const document = await Tickets.create({
                title: parameters.title,
                description: parameters.description,
                type: parameters.type,
                priority: parameters.priority | ticketPriority.UNKNOWN,
                status: parameters.status | ticketStatus.OPEN,
                project: parameters.project,
                createdBy: parameters.createdBy,
                assignedTo: [parameters.assignedTo]
            })
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
}

export default new ticketService