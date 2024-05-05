import "./Note.css";
import { useState } from "react";
import { escape } from "../../assets/js/escaping";
import DeleteDialog from "./../Dialog/DeleteDialog";
import UpdateDialog from "./../Dialog/UpdateDialog";

const beautifulColors = [
  "#ADD8E6", // Pale Blue
  "#98FF98", // Mint Green
  "#E6E6FA", // Lavender
  "#FFDAB9", // Peach
  "#FF7F50", // Coral
  "#87CEEB", // Sky Blue
  "#DA70D6", // Orchid
  "#FA8072", // Salmon
  "#40E0D0", // Turquoise
  "#FFD700", // Gold
  "#C8A2C8", // Lilac
  "#6A5ACD", // Slate Blue
  "#2E8B57", // Seafoam Green
  "#FF007F", // Rose
  "#CCCCFF", // Periwinkle
];

function Note({ note, removeNote, updateNote }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  function openDeleteDialog(e) {
    e.stopPropagation();
    document.querySelector("body").style.overflow = "hidden";
    setIsDeleteDialogOpen(true);
  }
  function closeDeleteDialog() {
    document.querySelector("body").style.overflow = "auto";
    setIsDeleteDialogOpen(false);
  }

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  function openUpdateDialog() {
    document.querySelector("body").style.overflow = "hidden";
    setIsUpdateDialogOpen(true);
  }
  function closeUpdateDialog() {
    document.querySelector("body").style.overflow = "auto";
    setIsUpdateDialogOpen(false);
  }

  return (
    <div>
      {isDeleteDialogOpen && (
        <DeleteDialog
          title={note.title}
          onCancel={closeDeleteDialog}
          onDelete={() => {
            removeNote(note._id);
            closeDeleteDialog();
          }}
        />
      )}
      {isUpdateDialogOpen && (
        <UpdateDialog
          note={note}
          onCancel={closeUpdateDialog}
          onUpdate={(newNote) => {
            updateNote(newNote);
            closeUpdateDialog();
          }}
        />
      )}
      <div
        className={"note"}
        style={{
          backgroundColor: beautifulColors[note._id % beautifulColors.length],
        }}
        role="button"
        onClick={() => openUpdateDialog()}
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
}

export default Note;
