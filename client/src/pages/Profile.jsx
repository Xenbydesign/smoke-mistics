import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, Link, useParams } from "react-router-dom";
//need a card for the readings
const Profile = () => {
    const { id } = useParams()
    const { user, updateUser, setAlertMessage } = useOutletContext()
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.id !== Number(id)) {
                navigate("/")
                handleSnackType("error")
                setAlertMessage("That doesn't belong to you!")
            }

            fetch(`/user/${id}`)
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(setUserInfo)
                    } else {
                        resp.json().then(err => {
                            handleSnackType("error")
                            setAlertMessage(err.message)
                        })
                    }
                })
                .catch(err => {
                    handleSnackType("error")
                    setAlertMessage(err.message)
                })
        }
    }, [user])

    const deleteProfile = () => {
        if (!user) {
            return;
        }

        fetch(`/user/${user.id}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    handleSnackType("success");
                    setAlertMessage("Your profile has been deleted");
                    navigate("/");
                    updateUser(null)
                } else {
                    handleSnackType("error");
                    setAlertMessage("Failed to delete profile.");
                }
            })
            .catch(error => {
                handleSnackType("error");
                setAlertMessage(error.message);
            })
    };

    const UserProfile = ({ userInfo, deleteProfile }) => {
        const allReadings = userInfo?.reading?.map(reading =>
            <Card key={reading.id} {...reading} />
        );

        return (
            <div>
                {userInfo && (
                    <div className="main">
                        <h2>{userInfo.username}'s Profile</h2>
                        <p>Username: {userInfo.username}</p>
                        <p>About me: {userInfo.bio}</p>  // Corrected text formatting for consistency

                        <div className="buttons">
                            <Link to="/profile/edit">
                                <button>Edit Profile</button>
                            </Link>
                            <button onClick={deleteProfile}>Delete Profile</button>
                        </div>
                    </div>
                )}
                <div className="container">
                    {allReadings.length > 0 ? allReadings : <p>No readings found.</p>}
                </div>
            </div>
        );
    };
    export default Profile