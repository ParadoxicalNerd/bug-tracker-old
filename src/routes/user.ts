import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export const router = express.Router()

router.post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => {
    res.status(200)
    res.json(req.user)
})