import { NewUser, LoginUser } from "../types/user"
import { xata } from "../utils/db";
import bycrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerUser = async (user: NewUser) => {
    const { name, email, role, password } = user;

    try {
        const getExistingUser = await xata.db.Users.filter({ email }).getFirst();

        if (getExistingUser) {
            return {
                code: 409,
                message: "User already exists"
            }
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const record = await xata.db.Users.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        return {
            code: 200,
            message: "User Registered successfully"
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.toString()
        }
    }
}

export const loginUser = async (user: LoginUser) => {
    const { email, password } = user;

    try {
        //check if the user email does not exist
        const getExistingUser = await xata.db.Users.filter({ email }).getFirst();

        if (!getExistingUser) {
            return {
                code: 404,
                message: "Invalid Credentials"
            }
        }

        // verify the passwords
        const passwordsMatch: boolean = await bycrypt.compare(password, getExistingUser.password);

        if (!passwordsMatch) {
            return {
                code: 404,
                message: "Invalid Credentials"
            }
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const jwtExpiredIn = process.env.JWT_EXPIRES_IN;

        if (!jwtSecretKey || !jwtExpiredIn) {
            throw new Error("jwt's are not defined yet")
        }

        const token = jwt.sign({ userId: getExistingUser.xata_id }, jwtSecretKey, { expiresIn: jwtExpiredIn});

        return {
            code: 200,
            token,
        }
    } catch (error: any) {
        return {
            code: 500,
            message: `An error occured: ${error.toString()}`
        }
    }
}
