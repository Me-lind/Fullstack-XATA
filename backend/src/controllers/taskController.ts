import { Request, Response } from "express";
import { getTasks } from "../services/taskService";

export const tasks = async (req: Request, res: Response) => {
    try {
        const { tasks } = await getTasks();
        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}
