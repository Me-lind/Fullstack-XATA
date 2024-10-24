import { comments } from "../controllers/commentController";
import { Router } from "express";

const commentRouter = Router();

commentRouter.get('/', comments);



export default commentRouter;
