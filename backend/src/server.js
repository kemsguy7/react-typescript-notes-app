"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
/**************************************************** This script is used to create a database connection to mongoDB */
const port = validateEnv_1.default.PORT; //env , gotten from the clean env setup in the  /util/validateEnv dir
mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("Mogoose Connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
    .catch(console.error);
