import express, {Express, Request, Response} from 'express';
import { config } from 'dotenv';
import { xata } from './utils/db';
import { authenticateTokenMiddleware } from './middleware/authTokenMiddleware';
import cors from 'cors';

//import routers
import authRouter from './routers/authRouter';
import teamRouter from './routers/teamRouter';
import projectRouter from './routers/projectRouter';
import taskRouter from './routers/taskRouter';
import commentRouter from './routers/commentRouter';


config()

const PORT: number | string = process.env.PORT || 5000

const app: Express = express();

// global middleware
app.use(express.json());
app.use(cors())

// register the routers
app.use('/auth', authRouter);
app.use('/teams', teamRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);

// test routes
app.get('/',  (req: Request, res: Response) => {
    res.status(200).json({ "message": "API is live!"})
})

app.get('/users', async (req: Request, res: Response) => {
    const users = await xata.db.Users.getAll();
    res.status(200).json(users);
})


// start the server
app.listen(PORT, () => {
    console.log(`Server is runnning on Port: ${PORT}`)
})
