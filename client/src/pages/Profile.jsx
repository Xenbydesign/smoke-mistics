// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import ReadingCard from "../components/ReadingCard";
const Profile = () => {
    // const { id } = useParams()
    // const { user, updateUser, setAlertMessage } = useOutletContext()
    // const [userInfo, setUserInfo] = useState({})
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         if (user.id !== Number(id)) {
    //             navigate("/")
    //         }
    //         return resp.json().then(errorObj => toast.error(errorObj.message))
    //     }
    //     fetch(`/user/${id}`)
    //         .then(resp => {
    //             if (resp.ok) {
    //                 return resp.json().then(setUserInfo)
    //             }
    //             return resp.json().then(errorObj => toast.error(errorObj.message))
    //         })
    //         .catch(err => console.log(err))
    // }, [user]);

    // const deleteProfile = () => {
    //     if (!user) {
    //         return;
    //     }

    //     fetch(`/user/${user.id}`, { method: "DELETE" })
    //         .then((response) => {
    //             if (response.ok) {
    //                 handleSnackType("success");
    //                 setAlertMessage("Your profile has been deleted");
    //                 navigate("/");
    //                 updateUser(null)
    //             } else {
    //                 handleSnackType("error");
    //                 setAlertMessage("Failed to delete profile.");
    //             }
    //         })
    //         .catch(error => {
    //             handleSnackType("error");
    //             setAlertMessage(error.message);
    //         })
    // };
    // const allReadings = userInfo?.reading?.map(reading =>
    //     <ReadingCard key={reading.id} {...reading} />
    // );

    return (
        <div>
            <h1>Profile page! </h1>
            {/* {userInfo && (
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
            </div> */}
        </div>
    );
};
export default Profile