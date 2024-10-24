export type Comment = {
    xata_id: string,
    content: string,
    taskId: string,
    userId: string
}

export type NewComment = Omit<Comment, "xata_id">
