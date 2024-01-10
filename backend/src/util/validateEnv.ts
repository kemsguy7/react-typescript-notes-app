import { cleanEnv, str, port } from "envalid";

// This script exports the sanitized version of our environment variable 
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});
