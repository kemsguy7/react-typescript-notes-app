"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });
//export the model
exports.default = (0, mongoose_1.model)("Note", noteSchema);
