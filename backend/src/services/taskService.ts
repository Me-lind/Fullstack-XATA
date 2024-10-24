import { Task, NewTask } from "../types/task";
import { xata } from "../utils/db"

// fetch all tasks
export const getTasks = async () => {
    try {
        const tasks = await xata.db.Tasks.getAll();
        return {
            code: 200,
            tasks
        }
    } catch (error: any) {
        return {
            code: 500,
            error: error.toString()
        }
    }
}

// create a task
export const createTask = async (task: NewTask) => {
    const { name, description, status, duedate, projectId, assignedToId } = task;

    try {
        const getExistingTask = await xata.db.Tasks.filter({ name }).getFirst();

        if (getExistingTask) {
            return {
                code: 409,
                message: "A task with the same name already exists"
            }
        }

        const record = await xata.db.Tasks.create({
            name,
            description,
            status,
            duedate,
            projectId,
            assignedToId
        })

        return {
            code: 200,
            message: "The task has been created successfully"
        }

    } catch (error: any) {
        return {
            code: 500,
            error: error.toString()
        }
    }
}


// update task

