import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title || "");
  const [editContent, setEditContent] = useState(props.content || "");

  function handleClick() {
    props.onDelete(props.id);
  }

  function startEdit() {
    setEditTitle(props.title || "");
    setEditContent(props.content || "");
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function saveEdit() {
    const updated = {
      title: editTitle,
      content: editContent,
    };
    if (props.onEdit) props.onEdit(props.id, updated);
    setIsEditing(false);
  }

  return (
    <div className={`note ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            placeholder="Content"
          />
          <div className="note-actions">
            <button onClick={saveEdit} aria-label="save">Save</button>
            <button onClick={cancelEdit} aria-label="cancel">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div className="note-actions">
            <button onClick={startEdit} aria-label="edit">
              <EditIcon />
            </button>
            <button onClick={handleClick} aria-label="delete">
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
