// export type User = {
//     xata_id: string;
//     name: string;
//     email: string;
//     role: "admin" | "user";
//     password: string;
// }

// export type NewUser = Omit<User, "xata_id">;
// export type LoginUser = Pick<User, "email" | "password">;

export type Team = {
    xata_id: string;
    name: string;
    description: string;
    adminId: string;
}

export type NewTeam = Omit<Team, "xata_id">;
export type UpdateTeam = Pick<Team, "name" | "description">
export type delTeam = Pick<Team, "name">
