import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: any;
}

export const authenticateTokenMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.signedCookies["token-Cookie"];

    const accessTokenSecret = process.env.JWT_SECRET_KEY;

    // If user has no token or it is malfunctioned
    if (!token || token === "null") {
        console.log(token)
        res.status(400).json({ message: "Unauthorized request" });
    }else if (!accessTokenSecret) {
        console.log('acess token was missing in the env files');
        res.sendStatus(500)
    } else {
        try {
            let verifiedUser = jwt.verify(token, accessTokenSecret);
            req.user = verifiedUser;
            next();
        } catch (err) {
            res.status(403).json({ message: "Invalid or expired token" })
        }
    }
}
