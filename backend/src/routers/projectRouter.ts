import { projects, create, update, deleteProj } from "../controllers/projectController";
import { Router } from "express";

const projectRouter = Router();

projectRouter.get('/', projects);
projectRouter.post('/create', create);
projectRouter.post('/update', update)
projectRouter.delete('/delete/:name', deleteProj)

export default projectRouter;
