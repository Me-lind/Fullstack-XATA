import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const {code, message} = await registerUser(req.body)
        res.status(code).json({message})
    } catch (error: any) {
        res.status(500).json({message: error.toString()})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {code, token} = await loginUser(req.body)
        res.status(code).json({token})
    } catch (error: any) {
        res.status(500).json({message: error.toString});
    }
}
