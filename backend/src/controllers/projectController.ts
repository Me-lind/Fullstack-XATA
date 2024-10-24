import { Request, Response } from "express";
import { createProject, getProjects, updateProject , deleteProject} from "../services/projectService";

// get the projects
export const projects = async (req: Request, res: Response) => {
    try{
        const { projects } = await getProjects();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

// create the project
export const create = async (req: Request, res: Response) => {
    try {
        const {code, message} = await createProject(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

// update the project
export const update = async (req: Request, res: Response) => {
    try {
        const {code, message } = await updateProject(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

// delete the project
export const deleteProj = async (req: Request, res: Response) => {
    try {
        const {code, message} = await deleteProject(req.params.name);
        res.status(code).json({message})
    } catch ( error: any) {
        res.status(500).json({message: error.toString()})
    }
}
