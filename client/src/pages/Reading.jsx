import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import ReadingCard from '../components/ReadingCard';

function Reading() {
    const [newReading, setNewReading] = useState(null)
    const { currentUser, addReadingToUser } = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/authentication");
        }
    }, [currentUser]);

    const generateReading = () => {
        fetch("/readings", { method: 'POST' })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(createdReading => {
                        setNewReading(createdReading)
                        addReadingToUser(createdReading);
                    })
                } else {
                    resp.json().then(errorObj => toast.error(errorObj.error));
                }
            })
            .catch(err => toast.error(err.message))
    };
    return (
        <div>
            <h2>🔮 Unveil the Mysteries of Tarot 🔮</h2>
            <h3>
                ✨Draw your daily insights from the Arcana, and embark on a mystical
                journey! 🌙
            </h3>
            <button onClick={currentUser && generateReading}>
                🔮 Discover Your Future 🔮{" "}
            </button>
            {newReading && <ReadingCard key={newReading.id} {...newReading} />}
        </div>
    );
}


export default Reading;