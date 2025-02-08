import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

function Notes({ notes, getNotes }) {
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!',
      background: '#0e0d0d',
      color: 'white',
      iconColor: 'gray',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/notes/delete/${id}/`)
          .then((res) => {
            if (res.status === 204) {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your note has been deleted.',
                confirmButtonColor: 'gray',
                background: '#0e0d0d',
                color: 'white',
                iconColor: 'gray',
              });
              getNotes();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error deleting note.',
                confirmButtonColor: 'gray',
                background: '#0e0d0d',
                color: 'white',
                iconColor: 'gray',
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Error deleting note.',
              confirmButtonColor: 'gray',
              background: '#0e0d0d',
              color: 'white',
              iconColor: 'gray',
            });
          });
      }
    });
  };

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = (id) => {
    api
      .put(`/api/notes/edit/${id}/`, { title: editTitle, content: editContent })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Your note has been updated.',
            confirmButtonColor: 'gray',
            background: '#0e0d0d',
            color: 'white',
            iconColor: 'gray',
          });
          setEditNoteId(null);
          getNotes();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error updating note.',
            confirmButtonColor: 'gray',
            background: '#0e0d0d',
            color: 'white',
            iconColor: 'gray',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error updating note.',
          confirmButtonColor: 'gray',
          background: '#0e0d0d',
          color: 'white',
          iconColor: 'gray',
        });
      });
  };

  return (
    <div className="note-container">
      {notes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((note) => {
          const date = new Date(note.date).toLocaleDateString("en-US");
          return (
            <div className="note" key={note.id}>
              <div className="note-title">
                {editNoteId === note.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => handleUpdate(note.id)}
                  />
                ) : (
                  <p onDoubleClick={() => handleEdit(note)}>{note.title}</p>
                )}
              </div>
              <span className="note-span">
                {editNoteId === note.id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onBlur={() => handleUpdate(note.id)}
                  />
                ) : (
                  <span onDoubleClick={() => handleEdit(note)}>{note.content}</span>
                )}
              </span>
              <div className="note-footer">
                <small>Created: {date}</small>
                <div className="delete-icon">
                  <a href="#!" onClick={() => deleteNote(note.id)}>
                    <i className="las la-trash-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Notes;