import Notes from "./../Notes";
import TakeNote from "./../TakeNote";
import useAPI from "./../../Hooks/useAPI";
import { Context } from "./../../App";
import { useContext, useEffect } from "react";
import ServerNotFound from "./../ServerNotFound";
import Loading from "./../Loading";

const Main = () => {
  const notesAPI = useAPI("http://localhost:5000/api/notes");
  const { searchText, setIsServerFound } = useContext(Context);

  useEffect(() => {
    console.log("hi");
    setIsServerFound(notesAPI.serverFound);
  }, [notesAPI.serverFound]);

  return !notesAPI.serverFound ? (
    <ServerNotFound />
  ) : !notesAPI.serverLoaded ? (
    <Loading />
  ) : (
    <main>
      {searchText === "" && <TakeNote addNote={notesAPI.addNote} />}
      <Notes notesAPI={notesAPI} />
    </main>
  );
};

export default Main;
