import Dialog from "./../";
import "./../Dialog.css";
import { useState } from "react";

function UpdateDialog({ note, onCancel, onUpdate }) {
  const [newNote, setNewNote] = useState(note);

  return (
    <Dialog>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        defaultValue={note.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        defaultValue={note.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      ></textarea>
      <div className="btn-container">
        <button onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
        <button onClick={() => onUpdate(newNote)} className="btn-update">
          Update
        </button>
      </div>
    </Dialog>
  );
}

export default UpdateDialog;
