import { RequestHandler } from "express";
import NoteModel from "../models/notes";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {  //setting up error handlers
        const notes = await NoteModel.find().exec(); //finds and executes the value of notes which is a promise
        res.status(200).json(notes);
    } catch (error) {
        next(error);
        
    }
};

export const createNote: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);

    } catch (error) {
        next(error);
    }
}