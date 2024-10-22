import { xata } from "../utils/db";

export const getProjects = async () => {
    try {
        const projects = await xata.db.Projects.getAll();
        return {
            code: 200,
            projects
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}
