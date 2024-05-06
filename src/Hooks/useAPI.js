import { useEffect, useState } from "react";

const useAPI = (url) => {
  const [notes, setNotes] = useState([]);
  const [serverFound, setServerFound] = useState(true);
  const [serverLoaded, setServerLoaded] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes(null);
      setServerFound(false);
    }
    setServerLoaded(true);
  };

  async function removeNote(id) {
    try {
      const response = await fetch(`${url}/${id}`, {
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
      const response = await fetch(`${url}/${newNote._id}`, {
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

  async function addNote(newNote) {
    try {
      const response = await fetch(url, {
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

  return {
    notes,
    fetchNotes,
    removeNote,
    updateNote,
    addNote,
    serverLoaded,
    serverFound,
  };
};

export default useAPI;
