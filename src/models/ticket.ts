import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { projectSchema, projectCollection } from '../models/project'
import { userSchema, userCollection } from './user'

export enum ticketTypes { BUG, FEATURE, DOCS }
export enum ticketStatus { OPEN, ASSIGNED, TESTING, RESOLVED }
export enum ticketPriority { UNKNOWN, LOW, MEDIUM, HIGH, CRITICAL }

@modelOptions({ schemaOptions: { timestamps: true } })
export class ticketSchema {
    @prop({ required: true })
    public title!: String

    @prop({ required: true })
    public description!: String

    @prop({ type: Number, enum: ticketTypes, required: true })
    public type!: ticketTypes

    @prop({ type: Number, enum: ticketPriority, required: true })
    public priority!: ticketPriority

    @prop({ type: Number, enum: ticketStatus, required: true })
    public status!: ticketStatus

    @prop({ ref: projectSchema, required: true })
    public project!: Ref<projectSchema>

    @prop({ ref: userSchema, required: true })
    public createdBy!: Ref<userSchema>

    @prop({ ref: userSchema, required: false })
    public assignedTo?: Ref<userSchema>[]

    @prop()
    public comments?: String[]

    @prop()
    public changeLog?: String[]
}

const ticketModel = getModelForClass(ticketSchema)
export const ticketCollection = ticketModel.collection.name

export default ticketModel


// import { createSchema, Type, typedModel, Extract, ExtractProps } from 'ts-mongoose'
// import { projectSchema, ProjectType, proScheme } from './project'
// import { userSchema } from './user'
// import mongoose, { Schema, model, Document, Types } from 'mongoose'
// import { Timestamps } from 'ts-mongoose/types/_shared'

// const ticket_types = ['bug', 'feature', 'docs'] as const
// const ticket_status = ['open', 'assigned', 'testing', 'resolved'] as const
// const ticket_priority = ['unknown', 'low', 'medium', 'high', 'critical'] as const

// const ticketSchema = createSchema({
//     ticket_type: Type.string({ enum: ticket_types, required: true }),
//     priority: Type.string({ enum: ticket_priority, required: true }),
//     status: Type.string({ enum: ticket_status, required: true }),
//     project: Type.ref(Type.objectId()).to('projects', projectSchema),
//     // createdBy: Type.ref(Type.objectId()).to('users', userSchema),
//     // assignedTo: Type.ref(Type.objectId()).to('users', userSchema),
//     // comments: Type.array().of(Type.string()),
//     // history: Type.array().of(Type.string())
// }, {
//     timestamps: true
// })

// export default typedModel('tickets', ticketSchema)
// export type TicketType = Extract<typeof ticketSchema>


// var schema = new Schema({
//     ticket_type: { type: String, enum: ticket_types, required: true },
//     priority: { type: String, enum: ticket_priority, required: true },
//     status: { type: String, enum: ticket_status, required: true },
//     project: { type: Types.ObjectId, ref: 'projects' }
// }, {
//     timestamps: true
// })

// interface ISchema extends mongoose.Document, mongoose.SchemaTimestampsConfig {
//     ticket_type: 'bug' | 'feature' | 'docs',
//     priority: string,
//     status: string,
//     project: proScheme["_id"]
// }

// let z: proScheme

// let a = model<ISchema>('s', schema)

// a.create({
//     priority: "critical",
//     ticket_type: "bug",
//     projec
// })
