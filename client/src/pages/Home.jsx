import ReadingCard from '../components/ReadingCard';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';





function HomePage() {

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

  const allReadings = readings.map(reading =>
    <ReadingCard key={reading.id} reading={reading} />
  );

  return (
    <div className="home-page">
      {allReadings.length > 0 ? allReadings : <p>No readings available.</p>}
    </div>
  );
}

export default HomePage


