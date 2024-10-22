import express, {Express, Request, Response} from 'express';
import { config } from 'dotenv';
import { xata } from './utils/db';
import { authenticateTokenMiddleware } from './middleware/authTokenMiddleware';

//import routers
import authRouter from './routers/authRouter';
import teamRouter from './routers/teamRouter';
// import taskRouter from './routers/taskRouter';


config()

const PORT: number | string = process.env.PORT || 5000

const app: Express = express();

// global middleware
app.use(express.json());

// register the routers
app.use('/auth', authRouter);
app.use('/teams', teamRouter)
// app.use('/task', taskRouter);

// test routes
app.get('/',  (req: Request, res: Response) => {
    res.status(200).json({ "message": "API is live!"})
})

app.get('/users', async (req: Request, res: Response) => {
    const users = await xata.db.Users.getAll();
    res.status(200).json(users);
})

app.get('/teams', async (req: Request, res: Response) => {
    const teams = await xata.db.Teams.getAll();
    res.status(200).json(teams);
})


// start the server
app.listen(PORT, () => {
    console.log(`Server is runnning on Port: ${PORT}`)
})
