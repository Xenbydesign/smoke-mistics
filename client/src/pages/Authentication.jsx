import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { object, string, date } from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

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
    image: string()
        .notRequired()
        .matches(/^https?:\/\/.*\.(png|jpeg|jpg)$/i, "Images must be in a valid format (jpg, jpeg, png)"),
    password: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(/[a-zA-Z0-9]/, "Passwords can only contain Latin letters and numbers")
        .required("Password is required"),
    aboutMe: string()
        .max(50, "Cannot be more than 50 characters"),
});

const signInSchema = object({
    email: string()
        .email("Email format not accepted")
        .required("Email is required"),
    password: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(
            /[a-zA-Z0-9]/,
            "Passwords can only contain latin numbers and letters")
        .required("Password is required"),
});
const initialValues = {
    username: "",
    email: "",
    password: ""
}
const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { updateCurrentUser } = useOutletContext();
    const navigate = useNavigate();
    const requestUrl = isLogin ? "/login" : "/signup"

    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            birthday: '',
            image: '',
            aboutMe: '',
        },
        validationSchema: isLogin ? signInSchema : signupSchema,
        onSubmit: (formData) => {
            fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(data => {
                if (resp.ok) {
                    updateCurrentUser(data.user);
                    navigate("/");
                } else {
                    toast.error(data.message);
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
                            name="image"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.image}
                        />
                        {formik.errors.image && formik.touched.image && (
                            <div className="error-message">{formik.errors.image}</div>
                        )}
                        <label>About Me</label>
                        <textarea
                            name="aboutMe"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.aboutMe}
                        />
                        {formik.errors.aboutMe && formik.touched.aboutMe && (
                            <div className="error-message">{formik.errors.aboutMe}</div>
                        )}
                    </>
                )}
                <label>Email</label>
                <input
                    type="text"
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
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                    <div className="error-message">{formik.errors.password}</div>
                )}
                <input type="submit" value={isLogin ? "Login!" : "Signup!"} />
            </form>
        </div>
    );
};

export default Authentication;




// import { useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router-dom';
// import { object, string, date } from 'yup';
// import { useFormik } from 'formik';
// import toast from 'react-hot-toast';

// const signupSchema = object({
//     username: string()
//         .min(1, "Usernames must be more than 1 character.")
//         .max(20, "Usernames cannot be more than 20 characters")
//         .required("Username is required"),
//     eMail: string()
//         .email("Email format not accepted")
//         .required("Email is required"),
//     birthday: date()
//         .required("Birthday is required"),
//     image: string()
//         .notRequired()
//         .matches(/^https?:\/\/.*\.(png|jpeg|jpg)$/i, "Images must be in a valid format (jpg, jpeg, png)"),
//     password: string()
//         .min(8, "Passwords must be at least 8 chars long")
//         .matches(/[a-zA-Z0-9]/, "Passwords can only contain Latin letters and numbers")
//         .required("Password is required"),
//     aboutMe: string()
//         .max(50, "Cannot be more than 50 characters"),
// });

// const signInSchema = object({
//     eMail: string()
//         .email("Email format not accepted")
//         .required("Email is required"),
//     password: string()
//         .min(8, "Passwords must be at least 8 chars long")
//         .required("Password is required"),
// });
// const initialValues = {
//     username: '',
// }
// const Authentication = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const { updateCurrentUser } = useOutletContext();
//     const navigate = useNavigate();
//     const requestUrl = isLogin ? "/login" : "/signup";
//     const formik = useFormik({
        
//         initialValues: {
//             username: '',
//             eMail: '',
//             password: '',
//             birthday: '',
//             image: '',
//             aboutMe: '',
//         },
//         validationSchema: isLogin ? signInSchema : signupSchema,
//         onSubmit: (formData) => {
//             fetch(requestUrl, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(formData)
//             })
//             .then(resp => resp.json())
//             .then(data => {
//                 if (data.status === "ok") {
//                     updateCurrentUser(data.user);
//                     navigate("/");
//                 } else {
//                     toast.error(data.message);
//                 }
//             })
//             .catch(error => {
//                 toast.error("Network error: " + error.message);
//             });
//         }
//     });

//     return (
//         <div>
//             <h2>Please Log In Or Sign Up {isLogin ? "Log In" : "Sign Up"}!</h2>
//             <h3>{isLogin ? "Log In" : "Sign Up"}!</h3>
//             <button onClick={() => setIsLogin(current => !current)}>
//                 {isLogin ? "Need to create an account?" : "Already have an account?"}
//             </button>

//             <form onSubmit={formik.handleSubmit}>
//                 {!isLogin && (
//                     <>
//                         <label>Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.username}
//                         />
//                         {formik.errors.username && formik.touched.username && (
//                             <div className="error-message">{formik.errors.username}</div>
//                         )}
//                         <label>Birthday</label>
//                         <input
//                             type="date"
//                             name="birthday"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.birthday}
//                         />
//                         {formik.errors.birthday && formik.touched.birthday && (
//                             <div className="error-message">{formik.errors.birthday}</div>
//                         )}
//                         <label>Image URL</label>
//                         <input
//                             type="text"
//                             name="image"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.image}
//                         />
//                         {formik.errors.image && formik.touched.image && (
//                             <div className="error-message">{formik.errors.image}</div>
//                         )}
//                         <label>About Me</label>
//                         <textarea
//                             name="aboutMe"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.aboutMe}
//                         />
//                         {formik.errors.aboutMe && formik.touched.aboutMe && (
//                             <div className="error-message">{formik.errors.aboutMe}</div>
//                         )}
//                     </>
//                 )}
//                 <label>Email</label>
//                 <input
//                     type="email"
//                     name="eMail"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.eMail}
//                 />
//                 {formik.errors.eMail && formik.touched.eMail && (
//                     <div className="error-message">{formik.errors.eMail}</div>
//                 )}
//                 <label>Password</label>
//                 <input
//                     type="password"
//                     name="password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.password}
//                 />
//                 {formik.errors.password && formik.touched.password && (
//                     <div className="error-message">{formik.errors.password}</div>
//                 )}
//                 <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
//             </form>
//         </div>
//     );
// };

// export default Authentication;
