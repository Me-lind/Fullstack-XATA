import express from 'express';
import { createTeam, joinTeam } from '../controllers/teamController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authenticateToken, createTeam);
router.post('/join', authenticateToken, joinTeam);

export default router;
