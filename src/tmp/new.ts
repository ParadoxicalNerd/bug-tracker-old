import Typegoose, { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class projectSchema {
    @prop()
    public name?: string;
}

enum ticket_types {
    BUG = 'BUG',
    FEATURE = 'FEATURE',
    DOCS = 'DOCS'
}
const ticket_status = ['open', 'assigned', 'testing', 'resolved'] as const
const ticket_priority = ['unknown', 'low', 'medium', 'high', 'critical'] as const

class Schema {
    @prop({ enum: ticket_types, required: true })
    public ticket_type!: String;

    @prop({ enum: ticket_priority, required: true })
    public priority!: String //{ type: String, enum: String, required: true };

    @prop({ enum: ticket_status, required: true })
    public status!: String //{ type: String, enum: String, required: true };

    @prop({ ref: projectSchema })
    public project: Ref<projectSchema>
}

const Kitten = getModelForClass(Schema);

Kitten.create({
    ticket_type: 'FEATURE',
    priority: 'open',
    status: 'fdfs',
    project: {
        name: 'dsfs'
    }
})