import { useState } from "react";
import api from "../api";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

function AddNote({ getNotes, setNotes, notes }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Note added successfully",
            confirmButtonText: "OK",
            confirmButtonColor: "gray",
            background: "#0e0d0d",
            color: "white",
            iconColor: "gray",
          });
          setContent("");
          setTitle("");
          getNotes(); // Refresh the list of notes

          // Close the modal
          const modalElement = document.getElementById("addNoteModal");
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          modal.hide();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error adding note",
            confirmButtonText: "OK",
            confirmButtonColor: "gray",
            background: "#0e0d0d",
            color: "white",
            iconColor: "gray",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error adding note",
          text: error.message,
          confirmButtonText: "OK",
          confirmButtonColor: "gray",
          background: "#0e0d0d",
          color: "white",
          iconColor: "gray",
        });
      });
  };

  return (
    <div
      className="modal fade"
      id="addNoteModal"
      tabIndex="-1"
      aria-labelledby="addNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNoteModalLabel">
              Add Note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={createNote} method="post">
            <div className="modal-body">
              <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Add title..."
              />
              <br />
              <textarea
                rows="8"
                cols="10"
                placeholder="Type to add a note..."
                name="content"
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                name="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;