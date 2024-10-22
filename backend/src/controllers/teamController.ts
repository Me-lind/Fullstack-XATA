import { Request, Response } from "express";
import { createTeam, deleteTeam, updateTeam } from "../services/teamService";
import { UpdateWorkspaceMemberInviteRequestBody } from "@xata.io/client";

export const create = async (req: Request, res: Response) => {
    try {
        const {code, message} = await createTeam(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {code, message} = await updateTeam(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const delTeam = async (req: Request, res: Response) => {
    try {
        const {code, message} = await deleteTeam(req.params.name)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}
