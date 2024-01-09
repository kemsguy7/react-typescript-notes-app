import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.getNotes); // get all notes 

router.get("/:noteId", NotesController.getNote);  //get notes by id

router.post("/", NotesController.createNote); //creates notes 

router.patch("/:noteId", NotesController.updateNote)  //updates note by id

router.delete("/:noteId", NotesController.deleteNote)  //delete notes 

export default router;