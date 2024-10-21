import { Request, Response } from 'express';
import xata from '../models/xata';

export const createTeam = async (req: Request, res: Response) => {
  const { name, description, adminId } = req.body;

  const newTeam = await xata.db.Teams.create({
    name,
    description,
    adminId,
  });

  res.json(newTeam);
};

export const joinTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.body;

  const team = await xata.db.Teams.read(teamId);
  if (!team) return res.status(404).json({ message: 'Team not found' });

  await xata.db.TeamsUsers.create({ teamId, userId });

  res.json({ message: 'User added to team' });
};
