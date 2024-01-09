"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
// This script exports the sanitized version of our environment variable 
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_CONNECTION_STRING: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(),
});
