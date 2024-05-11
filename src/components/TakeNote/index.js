import "./TakeNote.css";
import { useEffect, useState } from "react";
import Snackbar from "./../Snackbar";
import useInput from "./../../Hooks/useInput";

const TakeNote = ({ addNote }) => {
  const [isInputPressed, setIsInputPressed] = useState(false);
  const [isANoteAdded, setIsANoteAdded] = useState(false);
  const titleField = useInput("");
  const contentField = useInput("");

  const handleInsideClick = (e) => {
    e.stopPropagation();
    setIsInputPressed(true);
  };

  const handleOutsideClick = () => {
    setIsInputPressed(false);
  };

  const showSnackbar = () => {
    setIsANoteAdded(true);
    setTimeout(() => {
      setIsANoteAdded(false);
    }, 2000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const titleError = titleField.immediateError();
    const contentError = contentField.immediateError();
    if (titleError || contentError) {
      return;
    }
    addNote({
      title: titleField.value,
      content: contentField.value,
      creationDate: new Date().toISOString().substring(0, 10),
    });
    setIsInputPressed(false);
    titleField.clearValue();
    contentField.clearValue();
    showSnackbar();
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
          value={titleField.value}
          onChange={titleField.handleOnChange}
        />
        <div className={"hidden-form" + (isInputPressed ? " active" : "")}>
          {titleField.isError() && (
            <p className="error">Please fill the title</p>
          )}
          <textarea
            placeholder="content"
            onChange={contentField.handleOnChange}
            value={contentField.value}
          />
          {contentField.isError() && (
            <p className="error">Please fill the content</p>
          )}
          <div className="btn-container">
            <button type="submit" onClick={handleAdd}>
              add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TakeNote;
