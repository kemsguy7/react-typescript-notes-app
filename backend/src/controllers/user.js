"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = exports.getAuthenticatedUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAuthenticatedUserId = req.session.userId;
    try {
        if (!getAuthenticatedUserId) {
            throw (0, http_errors_1.default)(401, "You are not authenticated, please login and try again");
        }
        const user = yield user_1.default.findById(getAuthenticatedUserId).select("+Email").exec();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    try {
        if (!username || !email || !passwordRaw) {
            throw (0, http_errors_1.default)(400, "Missing username, email or password");
        }
        const existingUsername = yield user_1.default.findOne({ username: username }).exec();
        if (existingUsername) {
            throw (0, http_errors_1.default)(409, "Username already exists, kkindly choose another username");
        }
        const existingEmail = yield user_1.default.findOne({ email: email }).exec();
        if (existingEmail) {
            throw (0, http_errors_1.default)(409, "Email already exists, kindly choose another email");
        }
        const passwordHashed = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newUser = yield user_1.default.create({
            username: username,
            email: email,
            password: passwordHashed,
        });
        req.session.userId = newUser._id; //create a session for the user
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw (0, http_errors_1.default)(400, "Missing username or password");
        }
        /* The select() function is used to specify which fields to include or exclude in the result set. The + symbol means to include the field, and - means to exclude.
       In this case, it's including the password and email fields in the result set*/
        const user = yield user_1.default.findOne({ username: username }).select("+password +email").exec();
        if (!user) { //if creadentials don't match DB 
            throw (0, http_errors_1.default)(401, "Wrong username or password");
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) { // if password doesn't match DB
            throw (0, http_errors_1.default)(401, "invalid username or password");
        }
        req.session.userId = user._id; //create a session for the user
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
