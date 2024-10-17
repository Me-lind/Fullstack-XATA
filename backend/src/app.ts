import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// then we setup the middlewares that are to be used by the whole routes
app.use(cors()) // handles cross origin requests
app.use(express.json()) // handles the JSON requests


// Routes


export default app;


