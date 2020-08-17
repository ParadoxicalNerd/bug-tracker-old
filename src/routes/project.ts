import express from 'express'
import ProjectService from '../services/project'

const router = express.Router()
router.use(express.json())

router.route('/')
    .get(async (req, res, next) => {
        const { projects, error, statusCode } = await ProjectService.getAllProjects()
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(projects)
            res.json(projects)
        } else {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        const { project, error, statusCode } = await ProjectService.createProject(req.body)
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(project)
            res.json(project)
        } else {
            next(error)
        }
    })

router.route('/:projectID')
    .get(async (req, res, next) => {
        const { project, error, statusCode } = await ProjectService.getOneProject({ id: req.params.projectID })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(project)
            res.json(project)
        } else {
            next(error)
        }
    })
    .put(async (req, res, next) => {
        const { project, error, statusCode } = await ProjectService.modifyOneProject({ id: req.params.projectID, updates: req.body })
        res.statusCode = statusCode
        if (!error) {
            if (process.env.LOGGING) console.log(project)
            res.json(project)
        } else {
            next(error)
        }
    })
    .delete(async (req, res, next) => {
            const { project, error, statusCode } = await ProjectService.deleteProject({ id: req.params.projectID })
            res.statusCode = statusCode
            if (!error) {
                if(process.env.LOGGING) console.log(project)
                res.json(project)
            } else {
                next(error)
            }
        })

export {router}