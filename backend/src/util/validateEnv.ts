import { cleanEnv } from "envalid";
import {port, str } from "envalid/dist/validators";


// This script exports the sanitized version of our environment variable 
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
});
