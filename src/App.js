import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import React, { useState } from "react";

export const Context = React.createContext();

function App() {
  const [searchText, setSearchText] = useState("");
  const [isServerFound, setIsServerFound] = useState(false);

  return (
    <Context.Provider
      value={{ searchText, setSearchText, isServerFound, setIsServerFound }}
      className="App"
    >
      <Header />
      <Main />
    </Context.Provider>
  );
}

export default App;
