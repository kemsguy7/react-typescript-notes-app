import "dotenv/config";
import express, {Request, Response, NextFunction}  from "express";
import notesRoutes from "./routes/notes"; //the imported func can be named anything 
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv"; // import our validateEnv.ts file
import MongoStore from "connect-mongo";

//This script houses all endpoints

const app = express();

app.use(morgan("dev"));

//add express so that it accepts json bodies
app.use(express.json());

app.use(session({
    name: "session",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, //24 hours
    },
    rolling: true, //As long as the user is active, the session will be extended (refreshed automatically after expiration)
    store: MongoStore.create({ 
        mongoUrl: env.MONGO_CONNECTION_STRING  //connect-mongo will create a new collection called sessions in our database
    }),
}));

app.use("/api/users", userRoutes);
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