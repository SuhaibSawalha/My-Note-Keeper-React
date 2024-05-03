import { useState, useEffect } from "react";
import Note from "./../Note";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
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
    const id = newNote._id;
    delete newNote._id;
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) {
        console.error("Failed to update note");
      } else {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
}

export default Notes;
