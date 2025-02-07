import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Header({ username }) {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('logout_success', 'true');
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='header'>
      <h1>{username}'s Notes</h1>
      <a className="save" href="#" data-bs-toggle="modal" data-bs-target="#addNoteModal">Add Note</a>
      <a href='#!' onClick={handleLogout} className='save'>Logout</a>
    </div>
  );
}

export default Header;