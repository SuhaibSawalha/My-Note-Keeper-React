import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="App">
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Main searchText={searchText} />
    </div>
  );
}

export default App;
