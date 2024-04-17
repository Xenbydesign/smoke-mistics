import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />  {/* This is where Home, Reading, etc. will be rendered */}
            </main>
        </>
    );
}

export default App;

