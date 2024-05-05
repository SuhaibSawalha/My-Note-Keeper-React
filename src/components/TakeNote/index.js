import "./TakeNote.css";
import { useEffect, useState } from "react";
import Snackbar from "./../Snackbar";

function TakeNote({ addNote }) {
  const [isInputPressed, setIsInputPressed] = useState(false);

  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const [fillTitle, setFillTitle] = useState(false);
  const [fillContent, setFillContent] = useState(false);

  const [isANoteAdded, setIsANoteAdded] = useState(false);

  const handleInsideClick = (e) => {
    e.stopPropagation();
    setIsInputPressed(true);
  };

  const handleOutsideClick = () => {
    setIsInputPressed(false);
    setFillTitle(false);
    setFillContent(false);
  };

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    let shouldAdd = true;
    if (!newNote.title.trim()) {
      setFillTitle(true);
      shouldAdd = false;
    } else {
      setFillTitle(false);
    }
    if (!newNote.content.trim()) {
      setFillContent(true);
      shouldAdd = false;
    } else {
      setFillContent(false);
    }
    if (shouldAdd) {
      newNote.creationDate = new Date().toISOString().substring(0, 10);
      setIsInputPressed(false);
      setFillTitle(false);
      setFillContent(false);
      setNewNote({
        title: "",
        content: "",
      });
      addNote(newNote);
      setIsANoteAdded(true);
      setTimeout(() => {
        setIsANoteAdded(false);
      }, 2000);
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

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="take-note">
      {isANoteAdded && <Snackbar content={"Note added successfully"} />}
      <form onClick={handleInsideClick}>
        <input
          type="text"
          placeholder={isInputPressed ? "Title" : "Take a note ..."}
          value={newNote.title}
          onChange={handleOnChangeTitle}
        />
        {fillTitle && isInputPressed && (
          <p className="error">Please fill the title</p>
        )}
        <div className={"hidden-form" + (isInputPressed ? " active" : "")}>
          <textarea
            placeholder="content"
            onChange={handleOnChangeContent}
            value={newNote.content}
          />
          {fillContent && <p className="error">Please fill the content</p>}
          <div className="btn-container">
            <button type="submit" onClick={handleAdd}>
              add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TakeNote;
