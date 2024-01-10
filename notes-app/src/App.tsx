import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { error } from 'console';
import { Note as NoteModel } from './models/notes'; //using an alias to prevent errors
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css"
import * as NotesApi from "./network/notes_api";

function App() {

  //state Hooks
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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
     const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }
  loadNotes();
}, []);

//JSX to render
return (
  <Container> 
    <Row xs={1} md={2} xl={3} className="g-4">
    {notes.map(note => (
      <Col key={note._id}> 
        <Note note={note} className={styles.note} />
      </Col>
    ))}
    </Row>
  </Container>
);
}

export default App;
