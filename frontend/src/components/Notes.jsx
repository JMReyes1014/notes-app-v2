import { useEffect } from "react";
import api from "../api";
import Swal from "sweetalert2";

function Notes({ notes, getNotes }) {
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

  return (
    <div className="note-container">
      {notes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((note) => {
          const date = new Date(note.date).toLocaleDateString("en-US");
          return (
            <div className="note" key={note.id}>
              <div className="note-title">
                <p>{note.title}</p>
              </div>
              <span className="note-span">{note.content}</span>
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