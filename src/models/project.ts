import { createSchema, Type, typedModel, Extract } from 'ts-mongoose'
import { mongoose } from '@typegoose/typegoose'

export const projectSchema = createSchema({
    name: Type.string({ required: true }),
    description: Type.string(),
    createdBy: Type.objectId({
        required: true
    }),
    associatedUsers: Type.array({ required: true }).of(Type.objectId({ required: true })),
    tickets: Type.array().of(Type.objectId({ required: true }))
}, {
    timestamps: true
})

export default typedModel('projects', projectSchema)
export type ProjectType = Extract<typeof projectSchema>

export interface proScheme extends mongoose.Document {
    name: string,
    description: string,
    createdBy: Array<any>,
    associatedUsers: Array<any>,
    tickets: Array<any>
}