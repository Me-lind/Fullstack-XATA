import { Request, Response } from "express";
import { getProjects } from "../services/projectService";

// get the projects
export const projects = async (req: Request, res: Response) => {
    try{
        const { projects } = await getProjects();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}
