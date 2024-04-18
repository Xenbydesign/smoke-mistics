import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import ReadingCard from '../components/ReadingCard';

function HomePage() {
  return (
    < div >
      <div className="main">
        <h2>🔮 Unveil the Mysteries of Tarot 🔮</h2>
        <h3>✨Draw your daily insights from the Arcana, and embark on a mystical journey! 🌙</h3>
        <Link to="/create-reading">
          <button className="create-reading-btn">Create New Reading 🌟</button>
        </Link>
      </div>
      <div>
        <ReadingCard />
      </div>
    </div >

  )
}

export default HomePage


{/* <div className="container">
{allReadings.length > 0 ? allReadings : <p>No public readings available.</p>}
</div> */}