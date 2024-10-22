import express, {Express, Request, Response} from 'express';
import { config } from 'dotenv';
import { xata } from './utils/db';
import { authenticateTokenMiddleware } from './middleware/authTokenMiddleware';

//import routers
import authRouter from './routers/authRouter';

config()

const PORT: number | string = process.env.PORT || 5000

const app: Express = express();

app.use(express.json());

app.get('/',  (req: Request, res: Response) => {
    res.status(200).json({ "message": "API is live!"})
})

app.get('/users', async (req: Request, res: Response) => {
    const users = await xata.db.Users.getAll();
    res.status(200).json(users);
})

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is runnning on Port: ${PORT}`)
})
