import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [readings, setReadings] = useState([]);

    // Get Readings 
    useEffect(() => {
        fetch("/readings")
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setReadings)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => console.log(err))
    }, []);

    const updateCurrentUser = (user) => setCurrentUser(user)



    return (
        <>
            <NavBar currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
            <div><Toaster /></div>
            <Outlet context={{ readings, updateCurrentUser, currentUser }} />
        </>

    );
}

export default App;





// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom'
// import NavBar from './components/NavBar';
// import toast, { Toaster } from 'react-hot-toast';

// function App() {
//     const [readings, setReadings] = useState([]);
//     const [currentUser, setCurrentUser] = useState(null);


//     // Get Readings 
//     useEffect(() => {
//         fetch("/readings")
//             .then(resp => {
//                 if (resp.ok) {
//                     return resp.json().then(setReadings)
//                 }
//                 return resp.json().then(errorObj => toast.error(errorObj.message))
//             })
//             .catch(err => console.log(err))
//     }, []);

//     // Filtering to only include public readings.
//     const allReadings = readings.filter(reading => reading.is_public)
//         .map(reading => <Card key={reading.id} {...reading} />);

//     const updateCurrentUser = (user) => setCurrentUser(user)

//     return (
//         <>
//             <Header currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
//             <Outlet context={{ readings, allReadings, updateCurrentUser, currentUser }} />
//             <NavBar />
//         </>
//     );
// }


// export default App;
