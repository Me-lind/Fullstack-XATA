import { NewComment, Comment } from "../types/comment";
import { xata } from "../utils/db";

//get comments
export const getComments = async () => {
    try {
        const comments = await xata.db.Comments.getAll();
        return {
            code: 200,
            comments
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}
