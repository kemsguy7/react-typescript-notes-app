import "dotenv/config";
import express, {Request, Response, NextFunction}  from "express";
import notesRoutes from "./routes/notes"; //the imported func can be named anything 

//This script houses all endpoints

const app = express();

//add express so that it accepts json bodies
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use(( req, res, next ) => {
    next(Error("Endpoint not found"));
});




// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { //Error handling functionality 
    console.error(error);
    let errorMessage = "An unkwown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage })
});

export default app; 