import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ handleEdit, currentUser, updateCurrentUser }) {
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
    <>
      <nav className="navbar">
        <NavH1>  🔮Smoke & Mistics 🔮</NavH1>
        <NavLink to="/" className="active-link">Home</NavLink>
        <NavLink to="/reading" className="active-link" >Reading</NavLink>
        <NavLink to="/post-reading" className="active-link">Post Reading</NavLink>
      </nav>
    </>
  );
};

export default NavBar;