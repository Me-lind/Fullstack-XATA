import { projects, create, update } from "../controllers/projectController";
import { Router } from "express";

const projectRouter = Router();

projectRouter.get('/', projects);
projectRouter.post('/create', create);
projectRouter.post('/update', update)

export default projectRouter;
