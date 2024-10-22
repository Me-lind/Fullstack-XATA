import { Request, Response } from "express";
import { createTeam } from "../services/teamService";

export const create = async (req: Request, res: Response) => {
    try {
        const {code, message} = await createTeam(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}
