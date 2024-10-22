import { projects } from "../controllers/projectController";
import { Router } from "express";

const projectRouter = Router();

projectRouter.get('/', projects)



export default projectRouter;
