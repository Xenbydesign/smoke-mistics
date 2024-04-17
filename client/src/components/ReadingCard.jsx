import { Link } from 'react-router-dom'


function ReadingCard({ reading }) {
    const { user_id, tarot_cards, interpretation, comment, created_at, id } = reading
    return (
        <Card id={id}>
            <Link to={`readings/${id}`}>
                <div>
                    <h2>{user_id.username}</h2>
                    <img src={tarot_cards.image_url} alt='{alt}' />
                    <p>{interpretation}</p>
                    <p>{comment}</p>
                    <p>{created_at}</p>
                </div>
                <img src={image} alt={title} />
            </Link>
        </Card>
    )
}

export default ReadingCard
