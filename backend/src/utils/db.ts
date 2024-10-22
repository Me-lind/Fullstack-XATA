import { XataClient } from '../xata';
import { config } from 'dotenv';

config();

export const xata = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH
});
