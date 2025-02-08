import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import AddNote from "./AddNote";
import Notes from "./Notes";
import api from "../api";
import Swal from "sweetalert2";

function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [user, setUser] = useState({ username: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);

  useEffect(() => {
    getNotes();
    getUser();
    checkLoginSuccess();
    checkErrorFetch();
  }, []);

  useEffect(() => {
    document.title = `Notes App | ${user.username}'s Home`;
  }, [user]);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data);
      })
      .catch((error) => setErrorFetch(error));
  };

  const getUser = () => {
    api
      .get("/api/user/")
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => setErrorFetch(error));
  };

  const checkLoginSuccess = () => {
    const loginSuccess = localStorage.getItem('login_success');
    if (loginSuccess) {
      setLoginSuccess(true);
      localStorage.removeItem('login_success');
    }
  };

  const checkErrorFetch = () => {
    const errorFetch = localStorage.getItem('error_fetch');
    if (errorFetch) {
      setErrorFetch(new Error('Error fetching data.'));
      localStorage.removeItem('error_fetch');
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.username}!`,
        confirmButtonText: "OK",
        confirmButtonColor: "gray",
        background: "#0e0d0d",
        color: "white",
        iconColor: "gray",
      });
      setLoginSuccess(false); // Reset after displaying the alert
    }
  }, [user]);

  useEffect(() => {
    if(errorFetch) {
      Swal.fire({
        icon: "error",
        title: "There was an error!",
        text: errorFetch.message || "An error occurred. Reload the page.",
        confirmButtonText: "OK",
        confirmButtonColor: "gray",
        background: "#0e0d0d",
        color: "white",
        iconColor: "gray",
      });
      setErrorFetch(null);
    }
  }, [errorFetch]);

  const handleSearch = (searchValue) => {
    const filtered = notes.filter(note =>
      note.content.toLowerCase().includes(searchValue) ||
      note.title.toLowerCase().includes(searchValue)
    );
    setFilteredNotes(filtered);
  };

  return (
    <div className="containers">
      <Header username={user.username} />
      <Search onSearch={handleSearch} />
      <div className="note-container">
        <AddNote getNotes={getNotes} setNotes={setNotes} notes={notes} />
        <Notes notes={filteredNotes} getNotes={getNotes} user={user} />
      </div>
    </div>
  );
}

export default Home;