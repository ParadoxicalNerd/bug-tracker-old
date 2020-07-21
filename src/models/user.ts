// import { createSchema, Type, typedModel, Extract } from 'ts-mongoose'
// import passportLocalMongoose from 'passport-local-mongoose'

// const userTypes = ['filer', 'programmer', 'tester']

// export const userSchema = createSchema({
//     name: Type.string({ required: true }),
//     type: Type.string({ required: true, enum: userTypes }),
//     ticketsFiled: Type.array().of(Type.objectId({ required: true })),
//     ticketsClosed: Type.array().of(Type.objectId({ required: true })),
//     ticketsAssigned: Type.array().of(Type.objectId({ required: true }))
// })

// userSchema.plugin(passportLocalMongoose)

// export default typedModel('users', userSchema)
// export type UserType = Extract<typeof userSchema>

import { prop, getModelForClass, Ref, plugin } from '@typegoose/typegoose'
import { ticketSchema } from './ticket'
import passportLocalMongoose from 'passport-local-mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export enum userTypes { FILER, PROGRAMMER, TESTER }

// @plugin(passportLocalMongoose)
export class userSchema extends TimeStamps {
    @prop({ required: true })
    public name!: String

    @prop({ required: true, enum: userTypes, type: Number })
    public userType!: userTypes

    @prop({ ref: ticketSchema })
    public ticketsFiled?: Ref<ticketSchema>[]

    @prop({ ref: ticketSchema })
    public ticketsClosed?: Ref<ticketSchema>[]

    @prop({ ref: ticketSchema })
    public ticketsAssigned?: Ref<ticketSchema>[]
}

export default getModelForClass(userSchema)