import { Mongoose, Types } from "mongoose";

interface Request extends Express.Request {
    user: {
        email: string,
        password: string,
        name: string,
        userType: number,
        ticketsReported?: Types.ObjectId[],
        ticketsClosed?: Types.ObjectId[],
        ticketsActive?: Types.ObjectId[]
    }
}