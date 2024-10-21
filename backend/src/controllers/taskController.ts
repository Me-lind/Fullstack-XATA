import { Request, Response } from 'express';
import xata from '../models/xata';

export const createTask = async (req: Request, res: Response) => {
  const { description, status, dueDate, projectId, assignedToId } = req.body;

  const newTask = await xata.db.Tasks.create({
    description,
    status,
    dueDate,
    projectId,
    assignedToId,
  });

  res.json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updatedTask = await xata.db.Tasks.update(taskId, req.body);

  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  await xata.db.Tasks.delete(taskId);

  res.json({ message: 'Task deleted' });
};
