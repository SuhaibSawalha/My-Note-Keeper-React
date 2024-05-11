import Dialog from "./../";
import "./../Dialog.css";
import useInput from "./../../../Hooks/useInput";

const UpdateDialog = ({ note, onCancel, onUpdate }) => {
  const titleField = useInput(note.title);
  const contentField = useInput(note.content);

  const handleUpdate = () => {
    if (titleField.isError() || contentField.isError()) {
      return;
    }
    onUpdate({
      _id: note._id,
      title: titleField.value,
      content: contentField.value,
      creationDate: note.creationDate,
    });
  };

  return (
    <Dialog>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        defaultValue={note.title}
        onChange={titleField.handleOnChange}
      />
      {titleField.isError() && <p className="error">Please fill the title</p>}
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        defaultValue={note.content}
        onChange={contentField.handleOnChange}
      ></textarea>
      {contentField.isError() && (
        <p className="error">Please fill the content</p>
      )}
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
};

export default UpdateDialog;
