import { tasks, create } from "../controllers/taskController";
import { Router } from "express";

const taskRouter = Router();

taskRouter.get('/', tasks);
taskRouter.post('/create', create)


export default taskRouter;
