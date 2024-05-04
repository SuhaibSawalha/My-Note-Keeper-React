import Dialog from "./../";
import "./../Dialog.css";
import { useState } from "react";

function UpdateDialog({ note, onCancel, onUpdate }) {
  const [newNote, setNewNote] = useState(note);

  const [fillTitle, setFillTitle] = useState(false);
  const [fillContent, setFillContent] = useState(false);

  function handleUpdate() {
    let shouldUpdate = true;
    if (!newNote.title.trim()) {
      setFillTitle(true);
      shouldUpdate = false;
    } else {
      setFillTitle(false);
    }
    if (!newNote.content.trim()) {
      setFillContent(true);
      shouldUpdate = false;
    } else {
      setFillContent(false);
    }
    if (shouldUpdate) {
      onUpdate(newNote);
    }
  }

  const handleOnChangeTitle = (e) => {
    setNewNote({ ...newNote, title: e.target.value });
    if (e.target.value.trim()) {
      setFillTitle(false);
    } else {
      setFillTitle(true);
    }
  };

  const handleOnChangeContent = (e) => {
    setNewNote({ ...newNote, content: e.target.value });
    if (e.target.value.trim()) {
      setFillContent(false);
    } else {
      setFillContent(true);
    }
  };

  return (
    <Dialog>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        defaultValue={note.title}
        onChange={handleOnChangeTitle}
        {...(fillTitle && { className: "input-error" })}
      />
      {fillTitle && <p className="error">Please fill the title</p>}
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        defaultValue={note.content}
        onChange={handleOnChangeContent}
        {...(fillContent && { className: "input-error" })}
      ></textarea>
      {fillContent && <p className="error">Please fill the content</p>}
      <div className="btn-container">
        <button onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
        <button onClick={handleUpdate} className="btn-update">
          Update
        </button>
      </div>
    </Dialog>
  );
}

export default UpdateDialog;
