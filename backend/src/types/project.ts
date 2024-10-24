export type Project = {
    xata_id: string;
    name: string;
    teamId: string;
}

export type UpdateProject = Pick<Project,"name" | "teamId">;
