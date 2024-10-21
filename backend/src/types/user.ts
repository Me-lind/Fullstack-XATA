export type User = {
    xata_id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    password: string;
}

export type NewUser = Omit<User, "xata_id">;
export type LoginUser = Pick<User, "email" | "password">;
