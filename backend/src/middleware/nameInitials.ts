import { xata } from "../utils/db";
import { Request, Response } from 'express';

// Function to fetch the user's name from the Xata database
async function getNameFromDatabase(userId: string): Promise<string | null> {
    try {
        // Query the database to find the user by their ID
        const user = await xata.db.Users.filter({ xata_id: userId }).getFirst();

        // If no user is found, return null
        if (!user) {
            return null;
        }

        // Return the user's full name (assuming 'name' is the field that stores it)
        return user.name;
    } catch (error) {
        console.error("Error fetching name from database:", error);
        throw error;
    }
}

export default getNameFromDatabase;

