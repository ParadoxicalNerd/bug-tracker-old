import { Document, Types, Schema, model } from 'mongoose'   
import { projectModel, IProject, } from './project'
import { IUser, userModel } from './user'

export enum ticketTypes { BUG = 'BUG', FEATURE = 'FEATURE', DOCS = 'DOCS' }
export enum ticketStatus { OPEN = 'OPEN', ASSIGNED = 'ASSIGNED', TESTING = 'TESTING', RESOLVED = 'RESOLVED' }
export enum ticketPriority { UNKNOWN = 'UNKNOWN', LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }
const ticketTypesArray = Object.keys(ticketTypes)
const ticketStatusArray = Object.keys(ticketStatus)
const ticketPriorityArray = Object.keys(ticketPriority)

export type ITicket = Document & {
    title: String,
    description: String,
    type: ticketTypes,
    status: ticketStatus,
    priority: ticketPriority,
    project: Types.ObjectId | IProject,
    createdBy: Types.ObjectId[] | IUser[],
    assignedTo: Types.ObjectId[] | IUser[],
    comments?: String[],
    changeLog?: String[]
}

export const ticketSchema: Schema<any> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ticketTypesArray },
    status: { type: String, required: true, enum: ticketStatusArray },
    priority: { type: String, required: true, enum: ticketPriorityArray },
    project: { type: Types.ObjectId, required: true, ref: projectModel },
    createdBy: [{ type: Types.ObjectId, required: true, ref: userModel }],
    assignedTo: [{ type: Types.ObjectId, required: true, ref: userModel }],
    comment: [{ type: String, required: false }],
    changeLog: [{ type: String, required: false }]
})

export const ticketModel = model<ITicket>('tickets', ticketSchema)
