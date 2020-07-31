import mongoose, { Schema, Document, model, Types } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'
import assert from 'assert'

const tempSchema = new Schema({
    namea: { type: String, required: true }
})
interface ItempSchema extends Document {
    namea: String
}

export const tempModel = model<ItempSchema>('s', tempSchema)

type ItempModel = typeof tempModel

const userTypes = ['filer', 'programmer', 'tester']
export enum IuserTypes { filer = 'filer', programmer = 'programmer', tester = 'tester' }

export type IUser = Document & {
    name: String,
    type: IuserTypes,
    ticketsFiled: Array<ItempSchema['_id']>,
    ticketsClosed: ItempSchema['_id'],
    ticketsAssigned: Types.ObjectId[] | (typeof tempModel)[]
}

export const userSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: userTypes },
    ticketsFiled: [{ type: Schema.Types.ObjectId, required: true }],
    ticketsClosed: [{ type: Schema.Types.ObjectId, required: true }],
    ticketsAssigned: { type: Schema.Types.ObjectId, required: true, ref: tempModel }
})

// userSchema.plugin(passportLocalMongoose)

export const userModel = model<IUser>('users', userSchema);

function isArrayOfModel(value: Array<IUser>): value is Array {
    return value[0]._id != undefined
}

(async () => {
    let temp = await tempModel.create({
        namea: "sd"
    })
    temp._id
    console.log(temp)
    let user = await userModel.create({
        name: "Pankaj",
        type: IuserTypes.programmer,
        ticketsAssigned: [temp._id],
        ticketsClosed: [],
        ticketsFiled: []
    })
    console.log(user)
    user.populate(' ticketsAssigned', (err, user) => {
        if(isArrayOfModel(user))=>{

        }
        // console.log((<ItempSchema>user.ticketsAssigned).);
        // if (user.ticketsAssigned instanceof tempModel){
        //     user.ticketsAssigned._id
        // }
        // type _d = typeof tempModel[]
        // type _e = typeof user.ticketsAssigned

        // type Equals<X, Y> =
        //     (<T>() => T extends X ? 1 : 2) extends
        //     (<T>() => T extends Y ? 1 : 2) ? 'true' : 'false';

        // type Equals2<T, S> =
        //     [T] extends [S] ? (
        //         [S] extends [T] ? true : false
        //     ) : false

        // Equals<Head<[1,2,3]> == 1>();

        // let a: Equals<_d, _e>
        
        // let b = false

        // // assert(_d as _e)
        // let k = a.valueOf()

        // if(Equals<_d, _e>)


        // if (isArrayOfModel(user.ticketsAssigned)){
        //     user.ticket
        // }

        // assert(isArrayOfModel(user.ticketsAssigned));
        // user.ticketsAssigned

        // assert(typeof user.ticketsAssigned == typeof tempModel[])

        // user.ticketsAssigned

        // let z: infer

        // let s:mongoose.Model<ItempSchema, {}>[]=[]
        // let k:typeof user.ticketsAssigned
        // k


    })

})()