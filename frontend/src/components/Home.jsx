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

  useEffect(() => {
    getNotes();
    getUser();
    checkLoginSuccess();
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
        console.log(data);
      })
      .catch((error) => alert("Error fetching notes"));
  };

  const getUser = () => {
    api
      .get("/api/user/")
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => alert("Error fetching user data"));
  };

  const checkLoginSuccess = () => {
    const loginSuccess = localStorage.getItem('login_success');
    if (loginSuccess) {
      setLoginSuccess(true);
      localStorage.removeItem('login_success');
    }
  };

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
  }, [loginSuccess, user]);

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