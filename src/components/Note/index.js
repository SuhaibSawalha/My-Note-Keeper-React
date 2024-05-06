import "./Note.css";
import { useState } from "react";
import { escape } from "../../assets/js/escaping";
import DeleteDialog from "./../Dialog/DeleteDialog";
import UpdateDialog from "./../Dialog/UpdateDialog";
import { beautifulColors } from "./../../assets/js/constants";

const Note = ({ note, removeNote, updateNote }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const openDeleteDialog = (e) => {
    e.stopPropagation();
    document.querySelector("body").style.overflow = "hidden";
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    document.querySelector("body").style.overflow = "auto";
    setIsDeleteDialogOpen(false);
  };
  const handleDelete = () => {
    removeNote(note._id);
    closeDeleteDialog();
  };

  const openUpdateDialog = () => {
    document.querySelector("body").style.overflow = "hidden";
    setIsUpdateDialogOpen(true);
  };
  const closeUpdateDialog = () => {
    document.querySelector("body").style.overflow = "auto";
    setIsUpdateDialogOpen(false);
  };
  const handleUpdate = (newNote) => {
    updateNote(newNote);
    closeUpdateDialog();
  };

  return (
    <div>
      {isDeleteDialogOpen && (
        <DeleteDialog
          title={note.title}
          onCancel={closeDeleteDialog}
          onDelete={handleDelete}
        />
      )}
      {isUpdateDialogOpen && (
        <UpdateDialog
          note={note}
          onCancel={closeUpdateDialog}
          onUpdate={handleUpdate}
        />
      )}
      <div
        className={"note"}
        style={{
          backgroundColor: beautifulColors[note._id % beautifulColors.length],
        }}
        role="button"
        onClick={openUpdateDialog}
      >
        <div>
          <h3
            className="title"
            dangerouslySetInnerHTML={{ __html: escape(note.title) }}
          ></h3>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: escape(note.content) }}
          ></p>
        </div>
        <div>
          <p className="creation-date">{note.creationDate}</p>
          <button className="trash" onClick={openDeleteDialog}>
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
