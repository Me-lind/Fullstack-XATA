import { create } from "../controllers/teamController"
import { Router } from "express";

const teamRouter = Router();

teamRouter.post('/create', create)

export default teamRouter;
