import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bycrypt from "bcrypt";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {

    const getAuthenticatedUserId = req.session.userId;

    try {
        if(!getAuthenticatedUserId) {
            throw createHttpError(401, "You are not authenticated, please login and try again");
        }

        const user = await UserModel.findById(getAuthenticatedUserId).select("+Email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


/********************************************************** SIGNUP FUNCTIONALITY  ************/
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
}; 


/********************************************************** LOGIN FUNCTIONALITY  ************/
interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Missing username or password");
        }
        
         /* The select() function is used to specify which fields to include or exclude in the result set. The + symbol means to include the field, and - means to exclude. 
        In this case, it's including the password and email fields in the result set*/
        const user = await UserModel.findOne({ username: username }).select("+password +email").exec(); 
        
        if (!user) {  //if creadentials don't match DB 
            throw createHttpError(401, "Wrong username or password");
        }

        const passwordMatch = await bycrypt.compare(password, user.password);

        if (!passwordMatch) { // if password doesn't match DB
            throw createHttpError(401, "invalid username or password");
        }

        req.session.userId = user._id; //create a session for the user
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

};

export const logout: RequestHandler = async (req, res, next) => { //logout user
    req.session.destroy(error => { 
        if (error) {
            next(error);
        } else {
        res.status(204).send();
        }
    });
};