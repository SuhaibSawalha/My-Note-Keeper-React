import Dialog from "./../";
import "./../Dialog.css";

function DeleteDialog({ title, onCancel, onDelete }) {
  return (
    <Dialog>
      <h2>{title}</h2>
      <p>Are you sure you want to delete this note ?</p>
      <div className="btn-container">
        <button onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
        <button onClick={onDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </Dialog>
  );
}

export default DeleteDialog;
