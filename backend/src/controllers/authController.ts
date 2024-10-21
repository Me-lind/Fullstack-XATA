import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import xata from '../models/xata';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await xata.db.Users.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken({ id: newUser.id, role: newUser.role });
  res.json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await xata.db.Users.filter({ email }).getFirst();

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token });
};
