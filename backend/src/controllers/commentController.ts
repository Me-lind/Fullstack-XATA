import { Request, Response } from "express";
import { getComments } from "../services/commentService";

export const comments = async (req: Request,res: Response) => {
    try {
        const { comments } = await getComments();
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(500).json({message: error.toString()});
    }
}
