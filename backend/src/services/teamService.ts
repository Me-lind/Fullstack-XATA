import { NewTeam } from "../types/team";
import { xata } from "../utils/db";

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
