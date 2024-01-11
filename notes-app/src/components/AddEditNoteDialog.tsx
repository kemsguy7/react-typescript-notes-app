import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/notes";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
/****************************************** THIS SCRIPT HOUSES THE POPUP MODAL THAT IS USED TO ADD NOTE */

interface AddEditNoteDialogProps {
    noteToEdit?: Note, 
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}


const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({ //using the interdage defined in ../network/notes_api
        defaultValues: {  //define default values 
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    }); 
    
    async function onSubmit(input: NoteInput) {
      try {
        const noteResponse = await NotesApi.createNote(input);
        onNoteSaved(noteResponse);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }


    return (
        <Modal show onHide = {onDismiss}> 
            <Modal.Header closeButton> 
                <Modal.Title> 
                    {noteToEdit? "Edit note": "Add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}> 
                    <Form.Group className="mb-3">
                        <Form.Label> Title </Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Title"
                        isInvalid={!!errors.title}  //if there is an error for the title, show it here resolves to true or false
                        {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> Text </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addNoteForm"
                disabled={isSubmitting}
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;

function onNoteSaved(noteResponse: Note) {
    throw new Error("Function not implemented.");
}
