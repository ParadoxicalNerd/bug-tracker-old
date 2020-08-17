import { userModel, userTypes, IUser } from '../models/user'
import { Types } from 'mongoose'

import assert from 'assert'
import { ITicket } from '../models/ticket'

class UserService {
    async getAllUsers() {
        let user: any = null, error: any = null, statusCode: number

        try {
            const document = await userModel.find({})
                .populate('tickets', ['title', 'description', 'ofType', 'priority', 'status'])
                .exec()
            user = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            users: user,
            error,
            statusCode
        }
    }
    async createNewUser(
        parameters: {
            name: string,
            ofType: string,
        }
    ) {
        let user: any = null, error: any = null, statusCode: number

        try {
            const document = await userModel.create({
                name: parameters.name,
                ofType: userTypes[parameters.ofType as userTypes],
                tickets: []
            })
            user = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            user,
            error,
            statusCode
        }
    }
    async getOneUser(
        parameters: {
            id: string
        }
    ) {
        let user: any = null, error: any = null, statusCode: number

        try {
            const document = await userModel.findById(parameters.id)
                .populate('tickets')
                .exec()

            user = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            user,
            error,
            statusCode
        }
    }
    async modifyOneUser(
        parameters: {
            id: string,
            updates: {
                name: string,
                ofType: string
            }
        }
    ) {
        let user: any = null, error: any = null, statusCode: number

        try {
            const document = await userModel.findByIdAndUpdate(
                parameters.id,
                // @ts-ignore
                { $set: { ...parameters.updates } },
                { new: false }
            ).exec()

            user = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            user,
            error,
            statusCode
        }
    }
    async deleteUser(
        parameters: {
            id: string
        }
    ) {
        let user: any = null, error: any = null, statusCode: number

        try {
            const document = await userModel.findByIdAndDelete(parameters.id)
            user = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            user,
            error,
            statusCode
        }
    }
}

export default new UserService