import express from 'express';
import { createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authenticateToken, createTask);
router.put('/:taskId', authenticateToken, updateTask);
router.delete('/:taskId', authenticateToken, deleteTask);

export default router;
