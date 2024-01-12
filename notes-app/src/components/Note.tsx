import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css"; //utility styles
import { Card } from "react-bootstrap";
import { Note as NoteModel} from "../models/notes"; //using an alias to prevent errors
import  { formatDate } from "../utils/formatDate"; //
import { MdDelete } from  "react-icons/md";

/***************************************************************************** NOTE COMPONENT SCRIPT */

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void, //for edit funnctionality
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {

   // using destructuring syntax to get note details
   const {
    title, 
    text,
    createdAt,
    updatedAt
   } = note;

   let createdUpdatedText: string;
   if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
   } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
   }

   //template literal is used in card so multiple classnamea ca beadded
    return (
        <Card className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
            > 
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick={(e: { stopPropagation: () => void; }) => { //infer parameter tyoe from usage 
                            onDeleteNoteClicked(note);   
                            e.stopPropagation();

                        }}            
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}> 
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;