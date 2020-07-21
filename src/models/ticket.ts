import { createSchema, Type, typedModel, Extract, ExtractProps } from 'ts-mongoose'
import { projectSchema, ProjectType, proScheme } from './project'
import { userSchema } from './user'
import mongoose, { Schema, model, Document, Types } from 'mongoose'
import { Timestamps } from 'ts-mongoose/types/_shared'

const ticket_types = ['bug', 'feature', 'docs'] as const
const ticket_status = ['open', 'assigned', 'testing', 'resolved'] as const
const ticket_priority = ['unknown', 'low', 'medium', 'high', 'critical'] as const

const ticketSchema = createSchema({
    ticket_type: Type.string({ enum: ticket_types, required: true }),
    priority: Type.string({ enum: ticket_priority, required: true }),
    status: Type.string({ enum: ticket_status, required: true }),
    project: Type.ref(Type.objectId()).to('projects', projectSchema),
    // createdBy: Type.ref(Type.objectId()).to('users', userSchema),
    // assignedTo: Type.ref(Type.objectId()).to('users', userSchema),
    // comments: Type.array().of(Type.string()),
    // history: Type.array().of(Type.string())
}, {
    timestamps: true
})

export default typedModel('tickets', ticketSchema)
export type TicketType = Extract<typeof ticketSchema>


var schema = new Schema({
    ticket_type: { type: String, enum: ticket_types, required: true },
    priority: { type: String, enum: ticket_priority, required: true },
    status: { type: String, enum: ticket_status, required: true },
    project: { type: Types.ObjectId, ref: 'projects' }
}, {
    timestamps: true
})

interface ISchema extends mongoose.Document, mongoose.SchemaTimestampsConfig {
    ticket_type: 'bug' | 'feature' | 'docs',
    priority: string,
    status: string,
    project: proScheme["_id"]
}

let z: proScheme

let a = model<ISchema>('s', schema)

a.create({
    priority: "critical",
    ticket_type: "bug",
    projec
})
