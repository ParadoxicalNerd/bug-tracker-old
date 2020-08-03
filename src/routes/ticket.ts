import express from 'express'
import TicketService from '../services/ticket'

const router = express.Router()
router.use(express.json())

router.route('/')
    .get(async (req, res, next) => {
        const { tickets: ticket, error, statusCode } = await TicketService.getAllTickets()
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(ticket)
            res.json(ticket)
        } else {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        const { ticket, error, statusCode } = await TicketService.createNewTicket(req.body)
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(ticket)
            res.json(ticket)
        } else {
            next(error)
        }
    })

router.route('/:ticketID')
    .get(async (req, res, next) => {
        const { ticket, error, statusCode } = await TicketService.getOneTicket({ id: req.params.ticketID })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(ticket)
            res.json(ticket)
        } else {
            next(error)
        }
    })
    .put(async (req, res, next) => {
        const { ticket, error, statusCode } = await TicketService.replaceOneTicket({ id: req.params.ticketID, updates: req.body })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(ticket)
            res.json(ticket)
        } else {
            next(error)
        }
    })
// .delete(async (req, res, next) => {
//     const { ticket, error, statusCode } = await TicketService.deleteOneTicket({ id: req.params.ticketID })
//     res.statusCode = statusCode
//     if (!error) {
//         if(process.env.LOGGING) console.log(ticket)
//         res.json(ticket)
//     } else {
//         next(error)
//     }
// })

export { router }