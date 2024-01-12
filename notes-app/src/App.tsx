import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { error } from 'console';
import { Note as NoteModel } from './models/notes'; //using an alias to prevent errors
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css"
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa";
import {Spinner} from "react-bootstrap";

function App() {

  //state Hooks
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true); 
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  //const [clickCount, setClickCount] = useState(0);

  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React - typescript notes app
        </p>
        
        <Button onClick={() => setClickCount(clickCount + 1)}> 
          Clicked {clickCount} times
        </Button>
      </header>
    </div>
  );
} */

// Use effect Hook
useEffect(() => {
  async function loadNotes() {
    try {
	  setShowNotesLoadingError(false); //while loading notes, hide errors if there was on 
	  setNotesLoading(true);
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      setShowNotesLoadingError(true);
    } finally {
		setNotesLoading(false); //after the notes have finished loading, hide the loader  
	}
  }
  loadNotes();
}, []);

async function deleteNote(note: NoteModel) { //delete functionality for notes 
  try {
    await NotesApi.deleteNote(note._id);
    setNotes(notes.filter(existingNote => existingNote._id !== note._id)); //removes only the note with the id of the one we want to delete
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

const notesGrid =   //setting this to a variable for better organization of code
	<Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
		{notes.map(note => (
			<Col key={note._id}> 
				<Note 
				note={note} 
				className={styles.note} 
				onNoteClicked={setNoteToEdit}
				onDeleteNoteClicked={deleteNote}
				/>
			</Col>
		))}
	</Row>


//JSX to render
return (
  <Container className={styles.notesPage}>
    <Button 
      className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      onClick={() => setShowAddNoteDialog(true)}> 
      <FaPlus />
      Add New Note
    </Button> 
   {notesLoading && <Spinner animation='border' variant='primary' />}
   {showNotesLoadingError && <p>Something went wrong. Please refresh the page. </p>}
   {!notesLoading && !showNotesLoadingError && 
	<>
		{notes.length >0 
			? notesGrid
			: <p className={styleUtils.blockCenter}> No notes yet. Add one to get started. </p>
		}
	</>

   }
    {showAddNoteDialog && 
      <AddNoteDialog
        onDismiss={() => setShowAddNoteDialog(false)} 
        onNoteSaved={(newNote) => {  //newNote gotten from the note model
          setNotes([...notes, newNote ]);
          setShowAddNoteDialog(false)
    } } 
    />
  }

  {noteToEdit &&
  <AddNoteDialog 
  noteToEdit={noteToEdit}
  onDismiss={() => setNoteToEdit(null)}
  onNoteSaved={(updateNote) => {  
    setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote)); //if the id of the xisting note is same as the updated note,  return updated else, return exiting note change that id ui without reloading the page
    setNoteToEdit(null);

  }}
   />
  }
  </Container>
);
}

export default App;
