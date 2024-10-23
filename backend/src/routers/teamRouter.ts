import { create, delTeam, teams, update } from "../controllers/teamController"
import { Router } from "express";

const teamRouter = Router();

teamRouter.get('/', teams)
teamRouter.post('/create', create);
teamRouter.post('/update', update);
teamRouter.delete('/delete/:name', delTeam)

export default teamRouter;
