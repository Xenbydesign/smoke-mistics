import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css";

function NavBar({ currentUser, updateCurrentUser }) {
  const [menu, setMenu] = useState(false)

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

    <nav>
      <h1>  🔮Smoke & Mistics 🔮</h1>
      <div>
        {menu ? <ul>
          <li onClick={() => setMenu(!menu)}>x</li>
          {currentUser ? (
            <>
              <li onClick={handleDelete}>Logout</li>
              <li ><Link to='/reading'>New Reading🌙</Link></li>
            </>
          ) : (
            <li ><Link to='/authentication'>Sign Up🦇</Link></li>
          )}
          <li><Link to='/'> Home</Link></li>
        </ul> : <div onClick={() => setMenu(!menu)} />
        }
      </div>
    </nav>
  );
};

export default NavBar;