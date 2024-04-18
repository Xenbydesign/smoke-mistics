// import React from 'react';
// import { useEffect, useState } from "react"
// import { useOutletContext, Link } from "react-router-dom"
// //need a card for the readings
// // import NavBar from './components/NavBar';


//     // function Home() {
//     //   return (
//     //     <div>
//     //       <hi>WELCOME</hi>

const HomePage = () => {
//   const { setAlertMessage, handleSnackType } = useOutletContext();
//   const [readings, setReadings] = useState([]);

//   useEffect(() => {
//     fetch("/readings")
//     .then(resp => {
//       if (resp.ok) {
//         resp.json().then(setReadings);
//       } else {
//         resp.json().then(errorObj => {
//           handleSnackType("error");
//           setAlertMessage(errorObj.message);
//         });
//       }
//     })
//     .catch(errorObj => {
//       console.error('Fetch error:', errorObj);
//       handleSnackType("error");
//       setAlertMessage("An error occurred while fetching readings.");
//     });
//   }, [setAlertMessage, handleSnackType]); // Added dependencies for useEffect

//   // Filtering to only include public readings.
//   const allReadings = readings.filter(reading => reading.is_public)
//     .map(reading => <Card key={reading.id} {...reading} />);

  return (
    <div>
{/* //       <div className="main">
//         <h2>🔮 Unveil the Mysteries of Tarot 🔮</h2>
//         <h3>✨Draw your daily insights from the Arcana, and embark on a mystical journey! 🌙</h3>
//         <Link to="/create-reading">
//           <button className="create-reading-btn">Create New Reading 🌟</button>
//         </Link>
//       </div>

//       <div className="container">
//         {allReadings.length > 0 ? allReadings : <p>No public readings available.</p>}
//     </div> */}
    </div>
  );
}


export default HomePage;