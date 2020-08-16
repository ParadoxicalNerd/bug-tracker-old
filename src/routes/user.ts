import express from 'express'
import UserService from '../services/user'

const router = express.Router()
router.use(express.json())

// router.post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => {
//     res.status(200)
//     res.json(req.user)
// })

router.route('/')
    .get(async (req, res, next) => {
        const { users, error, statusCode } = await UserService.getAllUsers()
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(users)
            res.json(users)
        } else {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        const { user, error, statusCode } = await UserService.createNewUser(req.body)
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(user)
            res.json(user)
        } else {
            next(error)
        }
    })

router.route('/:userID')
    .get(async (req, res, next) => {
        const { user, error, statusCode } = await UserService.getOneUser({ id: req.params.userID })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(user)
            res.json(user)
        } else {
            next(error)
        }
    })
    .put(async (req, res, next) => {
        const { user, error, statusCode } = await UserService.modifyOneUser({ id: req.params.userID, updates: req.body })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(user)
            res.json(user)
        } else {
            next(error)
        }
    })
    .delete(async (req, res, next) => {
            const { user, error, statusCode } = await UserService.deleteUser({ id: req.params.userID })
            res.statusCode = statusCode
            if (!error) {
                if(process.env.LOGGING) console.log(user)
                res.json(user)
            } else {
                next(error)
            }
        })

export {router}