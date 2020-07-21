import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { userSchema } from './user'
import { ticketSchema } from './ticket'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class projectSchema {
    @prop({ required: true })
    public name!: String

    @prop()
    public description?: String

    @prop({ ref: 'userschemas' })
    public createdBy?: Ref<userSchema>[]

    // @prop({ ref: userSchema, required: false })
    // public associatedUsers?: Ref<userSchema>[]

    // @prop({ ref: ticketSchema, required: false })
    // public tickets?: Ref<ticketSchema>[]
}

export default getModelForClass(projectSchema)