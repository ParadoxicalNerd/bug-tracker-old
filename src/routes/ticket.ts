import express from 'express'
import bodyparser from 'body-parser'
import TicketService from '../services/ticket'

const router = express.Router()
router.use(bodyparser.json())

router.route('/')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(async (req, res, next) => {
        const { tickets, error, statusCode } = await TicketService.getAllTickets()
        res.status(statusCode)
        if (!error) {
            res.json(tickets)
        } else {
            res.json(error)
        }
    })


export { router }