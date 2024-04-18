// import React, { useState } from 'react';
// import toast from 'react-hot-toast';

function Reading() {
    //     const [reading, setReading] = useState(null);

    //     const handleGetReading = async () => {
    //         try {
    //             const response = await fetch('/api/readings', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ user_id: 1 })
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const data = await response.json();
    //             setReading(data);
    //             toast.success('New reading fetched successfully!');
    //         } catch (err) {
    //             toast.error('Failed to fetch reading');
    //         }
    //     };

    return (
        <h1>Your Tarot Reading</h1>
        // <div>
        //             <h1>Your Tarot Reading</h1>
        //             <button onClick={handleGetReading}>Get a New Reading</button>
        //             {reading && (
        //                 <div>
        //                     <h2>Interpretation</h2>
        //                     <p>{reading.interpretation}</p>
        //                     <h3>Cards Drawn</h3>
        //                     <ul>
        //                         {reading.cards.map(card => (
        //                             <li key={card.id}>{card.name}</li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             )}
        // </div>
    );
}

export default Reading;


