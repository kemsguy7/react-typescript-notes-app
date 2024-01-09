import app from './app';
import env from "./util/validateEnv"
import mongoose from "mongoose";

/**************************************************** This script is used to create a database connection to mongoDB */

const port = env.PORT; //env , gotten from the clean env setup in the  /util/validateEnv dir

mongoose.connect(process.env.MONGO_CONNECTION_STRING!) 
    .then(() => {
        console.log("Mogoose Connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
.catch(console.error);                                    



 