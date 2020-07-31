import { prop, getModelForClass, Ref, modelOptions, plugin, pre } from '@typegoose/typegoose'
import passportLocalMongoose from 'passport-local-mongoose'
import bcrypt from 'bcrypt'

import { ticketSchema, ticketCollection } from './ticket'
import { Strategy } from 'passport-local'
import { Document } from 'mongoose'

export enum userTypes { UNKNOWN, REPORTER, PROGRAMMER, TESTER }


@modelOptions({ schemaOptions: { timestamps: true } })
@plugin(passportLocalMongoose)
class userSchema {

    @prop({ required: true, unique: true })
    public email!: string

    @prop({ required: true })
    public password!: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true, enum: userTypes, type: Number })
    public userType!: userTypes

    @prop({ ref: () => ticketSchema })
    public ticketsReported?: Ref<ticketSchema>[]

    @prop({ ref: () => ticketSchema })
    public ticketsClosed?: Ref<ticketSchema>[]

    @prop({ ref: () => ticketSchema })
    public ticketsActive?: Ref<ticketSchema>[]

    static createStrategy: () => Strategy

    static register: (user: {
        email: string,
        name: string,
        userType: string,
        ticketsReported?: number,
        ticketsClosed?: number,
        ticketsActive?: number
    }, password: string) => Promise<Document>
}

const userModel = getModelForClass(userSchema)
export const userCollection = userModel.collection.name

export default userModel
export { userSchema }

// import mongoose, { Schema, Document, model } from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose'
// import Ticket from './ticket'


// const userTypes = ['filer', 'programmer', 'tester']
// enum IuserTypes { filer, programmer, tester }

// export interface IUser extends Document {
//     name: String,
//     type: IuserTypes,
//     ticketsFiled: typeof Ticket[''],
//     ticketsClosed: Schema.Types.ObjectId[],
//     ticketsAssigned: Schema.Types.ObjectId[]
// }

// export const userSchema = new Schema({
//     name: { type: String, required: true },
//     type: { type: String, required: true, enum: userTypes },
//     ticketsFiled: [{ type: Schema.Types.ObjectId, required: true }],
//     ticketsClosed: [{ type: Schema.Types.ObjectId, required: true }],
//     ticketsAssigned: [{ type: Schema.Types.ObjectId, required: true }]
// })

// userSchema.plugin(passportLocalMongoose)

// export default model<IUser>('users', userSchema)