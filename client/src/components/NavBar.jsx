// import { NavLink } from 'react-router-dom'
// import "./NavBar.css";

// function NavBar({ currentUser, updateCurrentUser }) {
//   const handleDelete = () => {
//     fetch("/logout", { method: "DELETE" })
//       .then(resp => {
//         if (resp.status === 204) {
//           updateCurrentUser(null)
//         }
//       })
//       .catch(err => console.log(err))
//   }
//   return (
//     <div>
//       <h1>  🔮Smoke & Mistics 🔮</h1>
//       {currentUser && (
//         <button onClick={handleDelete}>Logout</button>
//       )}
//       <h2>✨Draw your daily insights from the Arcana, and embark on a mystical journey! 🌙</h2>
//       <nav className="navbar">
//         <NavLink to="/" className="active-link">Home</NavLink>
//         <NavLink to="readings/new" className="active-link" > New Reading</NavLink>
//         <NavLink to="/profile" className="active-link">Profile</NavLink>

//       </nav>
//     </div>
//   );
// };

// export default NavBar;

import { NavLink } from "react-router-dom";
import "./NavBar.css";
import toast from "react-hot-toast";

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
    <>
      <nav className="navbar">
        <NavLink to="/" className="active-link">
          Home
        </NavLink>
        {currentUser ? (
          <>
            <NavLink to="/readings/new" className="active-link">
              Create Reading
            </NavLink>
            <NavLink to="/profile" className="active-link">
              Profile
            </NavLink>
            <NavLink to="#" className="active-link" onClick={handleDelete}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/authentication" className="active-link">
              Registration
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;