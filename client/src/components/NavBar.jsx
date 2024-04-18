import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { Toaster } from "react-hot-toast";

function NavBar() {
  return (
    <>
      <Toaster />
      
      <nav className="navbar">
        <NavLink to="/" className="active-link">Home</NavLink>
        <NavLink to="/reading" className="active-link" >Reading</NavLink>
        <NavLink to="/post-reading" className="active-link">Post Reading</NavLink>
      </nav>
    </>
  );
};

export default NavBar;