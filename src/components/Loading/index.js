import { Atom } from "react-loading-indicators";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <Atom color="#32cd32" size="small" text="" textColor="" />
    </div>
  );
}

export default Loading;
