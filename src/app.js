"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("./routes/notes")); //the imported func can be named anything 
//This script houses all endpoints
const app = (0, express_1.default)();
//add express so that it accepts json bodies
app.use(express_1.default.json());
app.use("/api/notes", notes_1.default);
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});
//Error handling the 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unkwown error occurred";
    if (error instanceof Error)
        errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});
exports.default = app;
