export type Task = {
    xata_id: string;
    description: string;
    name: string;
    status: "pending" | "in-progress" | "completed";
    duedate: string;
    projectId: string;
    assignedToId: string;
}

export type NewTask = Omit<Task, "xata_id">
