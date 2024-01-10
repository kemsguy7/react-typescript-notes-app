import "dotenv/config";
import express, {Request, Response, NextFunction}  from "express";
import notesRoutes from "./routes/notes"; //the imported func can be named anything 
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

//This script houses all endpoints

const app = express();

app.use(morgan("dev"));

//add express so that it accepts json bodies
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use(( req, res, next ) => {
    next(createHttpError(404, "Endpoint not found"));
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { //Error handling functionality 
    console.error(error);
    let errorMessage = "An unkwown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode  = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage })
});

export default app; 