import mongoose, { Schema, Document, model, Types } from 'mongoose';
import assert from 'assert'
interface User extends Document {
    _id: Types.ObjectId;
    name: string
}

interface Item extends Document {
    _id: Types.ObjectId;

    // Union typing here
    user: Types.ObjectId | User;
}

const ItemSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", index: true }
})

const ItemModel = model<Item>('Item', ItemSchema)

ItemModel.findById('234823486').populate("user").then((a)=>{
    let b =(<User>a!.user)
    b
})