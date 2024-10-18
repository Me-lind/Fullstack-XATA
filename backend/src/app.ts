import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// then we setup the middlewares that are to be used by the whole routes
app.use(cors()) // handles cross origin requests
app.use(express.json()) // handles the JSON requests


// Routes


// Testing if the test-environment works (Delete this when you start writing code to be tested)

export function sum(a: number, b: number): number {
    return a + b;
}

export default app;


