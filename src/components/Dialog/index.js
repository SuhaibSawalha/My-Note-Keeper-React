import "./Dialog.css";

const Dialog = ({ children }) => {
  return (
    <div className="outside-dialog">
      <div className="dialog">{children}</div>
    </div>
  );
};

export default Dialog;
