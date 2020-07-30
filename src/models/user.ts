import { prop, getModelForClass, Ref, modelOptions, plugin, pre } from '@typegoose/typegoose'
import passportLocalMongoose from 'passport-local-mongoose'
import bcrypt from 'bcrypt'

import { ticketSchema, ticketCollection } from './ticket'

export enum userTypes { UNKNOWN, REPORTER, PROGRAMMER, TESTER }


@modelOptions({ schemaOptions: { timestamps: true } })
@pre<userSchema>('save', async function (next) {
    const user = this
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})
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

    public isValidpassword(password: string) {
        const user = this
        const compare = bcrypt.compare(password, user.password)
        return compare
    }
}

const userModel = getModelForClass(userSchema)
export const userCollection = userModel.collection.name

export default userModel
export { userSchema }
