// import express from 'express'
// import bodyparser from 'body-parser'
// import TicketService from '../services/ticket'

// const router = express.Router()
// router.use(bodyparser.json())

// router.route('/')
//     .get(async (req, res, next) => {
//         const { tickets, error, statusCode } = await TicketService.getAllTickets()
//         res.statusCode = statusCode
//         if (!error) {
//             console.log(tickets)
//             res.json(tickets)
//         } else {
//             next(error)
//         }
//     })
// // .post(async (req, res, next)=>{
// //     req.user._id
// // })


// export { router }