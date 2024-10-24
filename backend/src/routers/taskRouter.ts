import { tasks, create, update, delTask } from "../controllers/taskController";
import { Router } from "express";

const taskRouter = Router();

taskRouter.get('/', tasks);
taskRouter.post('/create', create);
taskRouter.post('/update', update);
taskRouter.delete('/delete/:name', delTask);

export default taskRouter;
