// import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
// import { projectSchema } from '../models/project'

// enum ticket_types { BUG, FEATURE, DOCS }
// enum ticket_status { OPEN, ASSIGNED, TESTING, RESOLVED }
// enum ticket_priority { UNKNOWN, LOW, MEDIUM, HIGH, CRITICAL }

// class Schema {
//     @prop({ type: Number, enum: ticket_types, required: true })
//     public ticket_type!: ticket_types;

//     @prop({ type: Number, enum: ticket_priority, required: true })
//     public priority!: ticket_priority

//     @prop({ type: Number, enum: ticket_status, required: true })
//     public status!: ticket_status

//     @prop({ ref: projectSchema })
//     public project?: Ref<projectSchema>
// }

// const Kitten = getModelForClass(Schema);

// Kitten.create({
//     ticket_type: ticket_types.BUG,
//     priority: ticket_priority.UNKNOWN,
//     status: ticket_status.OPEN,
// })