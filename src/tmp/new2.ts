import mongoose, { Schema, Document, model, Types } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'
import assert from 'assert'

export const tempSchema = new Schema({
    namea: { type: String, required: true }
})
export interface ItempSchema extends Document {
    namea: String
}

export const tempModel = model<ItempSchema>('s', tempSchema)

type ItempModel = typeof tempModel

const userTypes = ['filer', 'programmer', 'tester']
export enum IuserTypes { filer = 'filer', programmer = 'programmer', tester = 'tester' }

export type IUser = Document & {
    name: String,
    type: IuserTypes,
    ticketsFiled: Array<ItempSchema['_id']>,
    ticketsClosed: ItempSchema['_id'],
    ticketsAssigned: Types.ObjectId[] | ItempSchema[]
}

export const userSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: userTypes },
    ticketsFiled: [{ type: Schema.Types.ObjectId, required: true }],
    ticketsClosed: [{ type: Schema.Types.ObjectId, required: true }],
    ticketsAssigned: [{ type: Schema.Types.ObjectId, required: true, ref: tempModel }]
})

// userSchema.plugin(passportLocalMongoose)

export const userModel = model<IUser>('users', userSchema);
