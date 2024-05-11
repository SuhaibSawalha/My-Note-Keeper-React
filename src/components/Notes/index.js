import Note from "./../Note";
import "./Notes.css";
import { Context } from "./../../App";
import { useContext } from "react";

const Notes = ({ notesAPI }) => {
  const { notes, removeNote, updateNote } = notesAPI;
  const { searchText } = useContext(Context);

  return (
    <div>
      {notes.length === 0 ? (
        <div className="no-notes">
          <h2>No notes found</h2>
        </div>
      ) : (
        <div className="notes">
          {notes.map(
            (note) =>
              (searchText === "" ||
                note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                note.content
                  .toLowerCase()
                  .includes(searchText.toLowerCase())) && (
                <Note
                  key={note._id}
                  note={note}
                  removeNote={removeNote}
                  updateNote={updateNote}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;
