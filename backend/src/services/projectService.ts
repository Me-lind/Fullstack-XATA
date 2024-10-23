import { Project, UpdateProject } from "../types/project";
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

export const createProject = async (project: Project) => {
    const { name, teamId } = project;

    try {
        const getExistingProject = await xata.db.Projects.filter({ name }).getFirst();

        if (getExistingProject) {
            return {
                code: 409,
                message: "A project with the same name alrealdy exists"
            }
        }

        const record  = await xata.db.Projects.create({
            name,
            teamId
        });

        return {
            code: 200,
            message: "The Project has been created successfully"
        }

    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

export const updateProject = async (project: UpdateProject) => {
    const { name, teamId } = project;

    try {
        const getExistingProject = await xata.db.Projects.filter({ name }).getFirst();

        if (!getExistingProject) {
            return {
                code: 404,
                message: "The project does not exist"
            }
        }

        const record = await xata.db.Projects.update({
            xata_id: getExistingProject.xata_id,
            teamId
        });

        return {
            code: 200,
            message: "The project has been updated successfully"
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

export const deleteProject = async (project: string) => {

    try {
        const getExistingProject = await xata.db.Projects.filter({ name: project }).getFirst();

        if (!getExistingProject) {
            return {
                code: 404,
                message: "The project does not exist"
            }
        }

        const record = await xata.db.Teams.delete(getExistingProject.xata_id)

        return {
            code: 200,
            message: "The project has been deleted successfully"
        }

    } catch(error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}
