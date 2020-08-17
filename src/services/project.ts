import { projectModel } from "../models/project";
import { Types } from "mongoose";

class ProjectService {
    async getAllProjects() {
        let projects: any = null, error: any = null, statusCode: number

        try {
            const document = await projectModel.find({})
                .populate('createdBy', ['name', 'ofType'])
                .populate('associatedUsers', ['name', 'ofType'])
                .populate('tickets', ['title', 'description', 'status'])
                .exec()
            projects = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            projects,
            error,
            statusCode
        }
    }

    async createProject(
        parameters:{
            name:string,
            description:string,
            createdBy:Types.ObjectId
        }
    ) {
        let project: any = null, error: any = null, statusCode: number

        try {
            const document = await projectModel.create({
                name:parameters.name,
                description:parameters.description,
                createdBy:[parameters.createdBy],
                associatedUsers:[],
                tickets:[]
            })
            project = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            project,
            error,
            statusCode
        }
    }
    async getOneProject(
        parameters:{
            id:string
        }
    ) {
        let project: any = null, error: any = null, statusCode: number

        try {
            const document = await projectModel.findById(parameters.id)
                .populate('createdBy')
                .populate('associatedUsers')
                .populate('tickets')
                .exec()
            project = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            project,
            error,
            statusCode
        }
    }
    async modifyOneProject(
        parameters: {
            id: string,
            updates: {
                name: string,
                description: string,
                associatedUsers:Types.ObjectId[]
            }
        }
    ) {
        let project: any = null, error: any = null, statusCode: number

        try {
            const document = await projectModel.findByIdAndUpdate(
                parameters.id,
                // @ts-ignore
                { $set: { ...parameters.updates } },
                { new: false }
            ).exec()

            project = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
             project,
            error,
            statusCode
        }
    }

    async deleteProject(
        parameters: {
            id: string
        }
    ) {
        let project: any = null, error: any = null, statusCode: number

        try {
            const document = await projectModel.findByIdAndDelete(parameters.id)
            project = document
            statusCode = 200
        } catch (err) {
            error = err
            statusCode = 500
        }
        return {
            project,
            error,
            statusCode
        }
    }
}

export default new ProjectService