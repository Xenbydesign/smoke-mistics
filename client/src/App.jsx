import { Link } from 'react-router-dom';
import {useState} from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';


function App() {
    const [currentUser, setCurrentUser] = useState(null)

    const updateCurrentUser = (user) => {
        setCurrentUser(user)
    }



    return (
        <div>
            <h1>
            🔮Smoke & Mistics 🔮
            </h1>
        <NavBar/>
        <Outlet context={{currentUser, updateCurrentUser}}/>

        </div>
    );
}

export default App;

