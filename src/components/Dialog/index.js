import "./Dialog.css";

function Dialog({ children }) {
  return (
    <div className="outside-dialog">
      <div className="dialog">{children}</div>
    </div>
  );
}

export default Dialog;
