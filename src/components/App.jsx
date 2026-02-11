import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("quicknote-notes");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse saved notes", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("quicknote-notes", JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container" >
        {notes.length === 0 ? (
          <div className="empty-state" >
            <p>
              Create your first note!
            </p>
          </div>
        ) : (
          notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
