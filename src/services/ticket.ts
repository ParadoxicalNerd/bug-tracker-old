import Tickets, { TicketType } from '../models/ticket'
import 'ts-mongoose/plugin'

class ticketService {
    async getAllTickets() {
        let tickets: any = null, error: any = null, statusCode: number
        const document = await Tickets.find().populateTs('project').populateTs('assignedTo')
        if (document) {
            tickets = document
            statusCode = 404
        } else {
            error = new Error('Unknown error occured')
            statusCode = 500
        }
        return {
            tickets,
            error,
            statusCode
        }
    }
    async createNewTicket(parameters: object) {
        Tickets.create({
            ticket_type: "bug",
            status: "open",
            priority: "unknown",
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    }
}

export default new ticketService