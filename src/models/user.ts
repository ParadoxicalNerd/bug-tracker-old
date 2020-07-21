import { createSchema, Type, typedModel, Extract } from 'ts-mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userTypes = ['filer', 'programmer', 'tester']

export const userSchema = createSchema({
    name: Type.string({ required: true }),
    type: Type.string({ required: true, enum: userTypes }),
    ticketsFiled: Type.array().of(Type.objectId({ required: true })),
    ticketsClosed: Type.array().of(Type.objectId({ required: true })),
    ticketsAssigned: Type.array().of(Type.objectId({ required: true }))
})

userSchema.plugin(passportLocalMongoose)

export default typedModel('users', userSchema)
export type UserType = Extract<typeof userSchema>