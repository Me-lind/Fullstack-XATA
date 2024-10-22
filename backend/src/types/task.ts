export type Task = {
    xata_id: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    dueDate: string;
    projectId: string;
    assignedToId: string;
}
