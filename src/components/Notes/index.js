import { useState, useEffect } from "react";
import Note from "./../Note";
import "./Notes.css";
import ServerNotFound from "./../ServerNotFound";
import Loading from "./../Loading";
import TakeNote from "./../TakeNote";

function Notes({ searchText }) {
  const [notes, setNotes] = useState([]);
  const [serverLoaded, setServerLoaded] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes(null);
    }
    setServerLoaded(true);
  };

  async function removeNote(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Failed to delete note");
      } else {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function updateNote(newNote) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${newNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        }
      );
      if (!response.ok) {
        console.error("Failed to update note");
      } else {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) {
        console.error("Failed to add note");
      } else {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return serverLoaded ? (
    notes ? (
      <div>
        {searchText === "" && <TakeNote addNote={addNote} />}
        {notes.length === 0 ? (
          <div className="no-notes">
            <h2>No notes found</h2>
          </div>
        ) : (
          <div className="notes">
            {notes.map(
              (note) =>
                (searchText === "" ||
                  note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  note.content
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) && (
                  <Note
                    key={note._id}
                    note={note}
                    removeNote={removeNote}
                    updateNote={updateNote}
                  />
                )
            )}
          </div>
        )}
      </div>
    ) : (
      <ServerNotFound />
    )
  ) : (
    <Loading />
  );
}

export default Notes;
