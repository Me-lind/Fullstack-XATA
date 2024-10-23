import getNameFromDatabase from '../middleware/nameInitials'
import { Request, Response } from 'express';

async function getUserInitials(req: Request, res: Response) {
    try {
        // Get the user ID from the request params (or another source like req.body)
        const userId = req.params.userId;

        // Fetch the user's full name from the database
        const fullName: string | null = await getNameFromDatabase(userId);

        // If no user is found, return a 404 response
        if (!fullName) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Split the full name into an array of names
        const nameParts: string[] = fullName.split(' ');

        let initials: string;

        if (nameParts.length > 1) {
            // If there are two names, take the first letter of both
            const firstInitial: string = nameParts[0][0]; // First letter of the first name
            const secondInitial: string = nameParts[1][0]; // First letter of the second name
            initials = (firstInitial + secondInitial).toUpperCase();
        } else {
            // If only one name, take the first and last letters
            const name: string = nameParts[0];
            initials = (name[0] + name[name.length - 1]).toUpperCase();
        }

        // Return the initials as part of the response
        return res.json({ initials });

    } catch (error) {
        return res.status(500).json({ message: 'Error processing request', error });
    }
}