import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'

import jwt from 'jsonwebtoken'
import config from '../database/config.json'
import User, { userTypes } from '../models/user'

// passport.use()

// passport.serializeUser(User.serializeUser())

// passport.use('signup', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         let user = await User.create({
//             email,
//             password,
//             name: "unknown",
//             userType: userTypes.UNKNOWN
//         })
//         done(null, user)
//     } catch (e) {
//         done(e)
//     }
// }))

// passport.use('login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         let user = await User.findOne({ email })
//         if (!user) {
//             done(null, false, { message: 'User not found' })
//         } else if (!user.isValidpassword(password)) {
//             done(null, false, { message: 'Incorrect password' })
//         } else {
//             done(null, user, { message: 'Login successful' })
//         }
//     } catch (e) {
//         done(e)
//     }
// }))

// export const authUser = passport.authenticate()