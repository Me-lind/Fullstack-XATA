import { create, update } from "../controllers/teamController"
import { Router } from "express";

const teamRouter = Router();

teamRouter.post('/create', create);
teamRouter.post('/update', update);

export default teamRouter;
