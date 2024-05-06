import "./Snackbar.css";
import { useState } from "react";

const Snackbar = ({ content }) => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(true);

  return (
    isSnackbarVisible && (
      <div className="snackbar-container">
        <div className="snackbar">
          <p>{content}</p>
          <button onClick={() => setIsSnackbarVisible(false)}>x</button>
        </div>
      </div>
    )
  );
};

export default Snackbar;
