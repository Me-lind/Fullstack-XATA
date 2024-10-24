import { NewTeam, UpdateTeam } from "../types/team";
import { xata } from "../utils/db";

// get teams
export const getTeams = async () => {
    try {
        const teams = await xata.db.Teams.getAll();
        return {
            code: 200,
            teams
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

// create a team
export const createTeam = async (team: NewTeam) => {
    const { name, description, adminId} = team;

    try {
        const getExistingTeam = await xata.db.Teams.filter({ name }).getFirst();

        if (getExistingTeam) {
            return {
                code: 409,
                message: "A team with the same name already exist"
            }
        }

        const record  = await xata.db.Teams.create({
            name,
            description,
            adminId
        });

        return {
            code: 200,
            message: "The team has been created successfully"
        }

    } catch(error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

// update team
export const updateTeam = async (team: UpdateTeam) => {
    const { name, description} = team;

    try {
        const getExistingTeam = await xata.db.Teams.filter({ name }).getFirst();

        if (!getExistingTeam || !name || !description ) {
            return {
                code: 400,
                message: "The team doesn't exist"
            }
        }

        const record  = await xata.db.Teams.update({
            xata_id: getExistingTeam.xata_id,
            name,
            description,
        });

        return {
            code: 200,
            message: "The team has been updated successfully"
        }

    } catch(error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

export const deleteTeam = async (team: string) => {

    try {
        const getExistingTeam = await xata.db.Teams.filter({ name: team  }).getFirst();
        
        if (!getExistingTeam)  {
            console.log(getExistingTeam);
            return {
                code: 409,
                message: "The team doesn't exist"
            }
        }

        const record  = await xata.db.Teams.delete(getExistingTeam.xata_id);

        return {
            code: 200,
            message: "The team has been deleted successfully"
        }

    } catch(error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}
