import { Strategy } from 'passport-local'
import { Document, Schema, model, Types } from 'mongoose'
import { ticketModel, ITicket } from './ticket'

export enum userTypes { FILTER = 'FILTER', PROGRAMMER = 'PROGRAMMER', TESTER = 'TESTER' }
const userTypesArray = Object.keys(userTypes)

// NOTE: Replace refs with virtual functions as an expoeriment
export type IUser = Document & {
    name: String,
    ofType: userTypes,
    tickets: Types.ObjectId[] | ITicket[],
}

export const userSchema: Schema<any> = new Schema({
    name: { type: String, required: true },
    ofType: { type: String, required: true, enum: userTypesArray },
    tickets: [{ type: Schema.Types.ObjectId, required: true, ref: ticketModel }],
})

// userSchema.plugin(passportLocalMongoose)

export const userModel = model<IUser>('users', userSchema);