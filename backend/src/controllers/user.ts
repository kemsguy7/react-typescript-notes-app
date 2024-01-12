import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bycrypt from "bcrypt";



interface SignUpBody {
    username?: string,
    password?: string,
    email?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email
     const passwordRaw = req.body.password;


    try {
        
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Missing username, email or password");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if ( existingUsername ){ 
            throw createHttpError(409, "Username already exists, kkindly choose another username");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if ( existingEmail ){ 
            throw createHttpError(409, "Email already exists, kindly choose another email");
        }

        const passwordHashed = await bycrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create ({  //create a new user
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id; //create a session for the user

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}