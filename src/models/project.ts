import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { userSchema, userCollection } from './user'
import { ticketSchema, ticketCollection } from './ticket'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

@modelOptions({ schemaOptions: { timestamps: true } })
export class projectSchema {
    @prop({ required: true })
    public name!: String

    @prop()
    public description?: String

    @prop({ ref: userSchema })
    public createdBy?: Ref<userSchema>[]

    @prop({ ref: userSchema })
    public associatedUsers?: Ref<userSchema>[]

    @prop({ ref: () => ticketSchema })
    public tickets?: Ref<ticketSchema>[]
}

const projectModel = getModelForClass(projectSchema)
export const projectCollection = projectModel.collection.name

export default projectModel