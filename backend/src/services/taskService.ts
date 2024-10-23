import { Task } from "../types/task";
import { xata } from "../utils/db"

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
