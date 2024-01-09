import { RequestHandler } from "express";
import NoteModel from "../models/notes";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {  //setting up error handlers
        const notes = await NoteModel.find().exec(); //finds and executes the value of notes which is a promise
        res.status(200).json(notes);
    } catch (error) {
        next(error);
        
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
   
        if (!mongoose.isValidObjectId(noteId)) { // if an invalid note id was supplied
            throw createHttpError(400, "invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) { // the note does not exist
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody { //define the types for notes
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {

        if (!title) {  //if tilte is not present 
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interfacr

export const updateNote: RequestHandler =  async (req, res, next) => {
    try {

    } catch (error) {

    }
}