import { Task } from "../types/task";
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
export const createTask = async (task: Task) => {
    try {
        console.log()
    } catch (error: any) {
        console.log(error)
    }
}
