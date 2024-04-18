import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import "./NavBar.css";

function NavBar({ currentUser, updateCurrentUser }) {
  const handleDelete = () => {
    fetch("/logout", { method: "DELETE" })
      .then(resp => {
        if (resp.status === 204) {
          updateCurrentUser(null)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <h1>  🔮Smoke & Mistics 🔮</h1>
      <button onClick={handleDelete}>Logout</button>
      <h2>✨Draw your daily insights from the Arcana, and embark on a mystical journey! 🌙</h2>
      <nav className="navbar">
        <NavLink to="/" className="active-link">Home</NavLink>
        <NavLink to="/reading" className="active-link" > New Reading</NavLink>
        <NavLink to="/profile" className="active-link">Profile</NavLink>

      </nav>
    </div>
  );
};

export default NavBar;