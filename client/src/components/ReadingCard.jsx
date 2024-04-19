import { Link, useLocation, useParams, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader"

const ReadingCard = ({ reading }) => {
    const { currentUser } = useOutletContext()
    const [fetchReading, setFetchReading] = useState(null)
    const { pathname } = useLocation();
    const { readingId } = useParams();
    useEffect(() => {
        if (!!readingId) {
            fetch(`/readings/${readingId}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json().then(setFetchReading)
                    }
                    resp.json().then(errorObj => (
                        toast.error(errorObj.message)
                    ))
                })
        }


    }, [])
    if (!reading && !fetchReading) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }
    const { user, tarot_cards, interpretation, created_at, id, user_id } = reading || fetchReading
    return (
        <>
            <div className="tarot-container">
                <img src={tarot_cards[0].image_url} alt={tarot_cards[0].alt} />
                <img src={tarot_cards[1].image_url} alt={tarot_cards[1].alt} />
                <img src={tarot_cards[2].image_url} alt={tarot_cards[2].alt} />
            </div>
            <div className="details">
                <p>A reading for {user.username}</p>
                {pathname === "/" ? (
                    <Link to={`reading/${id}`}>see more</Link>
                ) : (
                    <div>
                        <p>{tarot_cards[0].name}, {tarot_cards[1].name},  {tarot_cards[2].name}</p>
                        {currentUser.id === user_id && <button>public</button>}
                        <p>{interpretation}</p>
                        <p></p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReadingCard
