import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { object, string, date } from 'yup';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

const signupSchema = object({
    username: string()
        .min(1, "Usernames must be more than 1 character.")
        .max(20, "Usernames cannot be more than 20 characters")
        .required("Username is required"),
    email: string()
        .email("Email format not accepted")
        .required("Email is required"),
    birthday: date()
        .required("Birthday is required"),
    profile_image: string()
        .matches(/^https?:\/\/.*\.(png|jpeg|jpg)$/i, "Images must be in a valid format (jpg, jpeg, png)"),
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(/[a-zA-Z0-9]/, "Passwords can only contain Latin letters and numbers")
        .required("Password is required"),
    about_me: string()
        .max(50, "Cannot be more than 50 characters"),
});

const signInSchema = object({
    email: string()
        .email("Email format not accepted")
        .required("Email is required"),
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(
            /[a-zA-Z0-9]/,
            "Passwords can only contain latin numbers and letters")
        .required("Password is required"),
});
const initialValues = {
    username: '',
    email: '',
    password_hash: '',
    birthday: '',
    profile_image: '',
    about_me: '',
}
const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { updateCurrentUser } = useOutletContext();
    const navigate = useNavigate();
    const requestUrl = isLogin ? "/login" : "/signup"


    const formik = useFormik({
        initialValues,
        validationSchema: isLogin ? signInSchema : signupSchema,
        onSubmit: (formData) => {
            console.log("Form submitted", formData);
            fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(user => {
                            updateCurrentUser(user);
                            navigate("/");
                        })
                    } else {
                        resp.json().then(errorobj => {
                            toast.error(errorobj.message)
                        })
                            ;
                    }
                })
                .catch(error => {
                    toast.error("Network error: " + error.message);
                });
        }
    });

    return (
        <div>
            <h2>Please Log In Or Sign Up</h2>
            <h3>{isLogin ? "Log In" : "Sign Up"}!</h3>
            <button onClick={() => setIsLogin(current => !current)}>
                {isLogin ? "Register Now!" : "Log In!"}
            </button>

            <form onSubmit={formik.handleSubmit}>
                {!isLogin && (
                    <>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div className="error-message">{formik.errors.username}</div>
                        )}

                        <label>Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthday}
                        />
                        {formik.errors.birthday && formik.touched.birthday && (
                            <div className="error-message">{formik.errors.birthday}</div>
                        )}
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="profile_image"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.profile_image}
                        />
                        {formik.errors.profile_image && formik.touched.profile_image && (
                            <div className="error-message">{formik.errors.profile_image}</div>
                        )}
                        <label>About Me</label>
                        <textarea
                            name="about_me"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.about_me}
                        />
                        {formik.errors.about_me && formik.touched.about_me && (
                            <div className="error-message">{formik.errors.about_me}</div>
                        )}
                    </>
                )}
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className="error-message">{formik.errors.email}</div>
                )}
                <label>Password</label>
                <input
                    type="password"
                    name="password_hash"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password_hash}
                />
                {formik.errors.password_hash && formik.touched.password_hash && (
                    <div className="error-message">{formik.errors.password_hash}</div>
                )}
                <input type="submit" value={isLogin ? "Login!" : "Signup!"} />
            </form>
        </div>
    );
};

export default Authentication;