import  { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema ({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });


//create a type for typescript
type Note = InferSchemaType<typeof noteSchema>;

//export the model
export default model<Note>("Note", noteSchema);
