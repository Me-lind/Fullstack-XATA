import { Request, Response } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskService";

export const tasks = async (req: Request, res: Response) => {
    try {
        const { tasks } = await getTasks();
        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const {code, message} = await createTask(req.body);
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {code, message} = await updateTask(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const delTask = async (req: Request, res: Response) => {
    try {
        const {code, message} = await deleteTask(req.params.name)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}
