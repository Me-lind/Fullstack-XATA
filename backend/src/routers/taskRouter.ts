import { tasks } from "../controllers/taskController";
import { Router } from "express";

const taskRouter = Router();

taskRouter.get('/', tasks);


export default taskRouter;
