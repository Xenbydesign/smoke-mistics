// import React, { useState } from 'react';
// import useAuthForms from '../hooks/useAuthForms';
// import { toast } from 'react-hot-toast';

function Reading() {
//     const [isLogin, setIsLogin] = useState(true); 
//     const { formik, serverError } = useAuthForms(isLogin);

//     // Handle form submission success and error
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const result = await formik.handleSubmit(event);
//         if (result.success) {
//             toast.success('Successfully logged in!');
//         } else {
//             toast.error(result.message || 'An error occurred during login.');
//         }
//     };

    return (
        <div>
{/* //             <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//             <button onClick={() => setIsLogin(!isLogin)}>
//                 {isLogin ? "Need to create an account?" : "Already have an account?"}
//             </button>
//             <form onSubmit={handleSubmit}>
//                     type="text"
//                     name="username"
//                     onChange={formik.handleChange}
//                     value={formik.values.username}
//                     placeholder="Username"
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     onChange={formik.handleChange}
//                     value={formik.values.password}
//                     placeholder="Password"
//                 />
//                 {!isLogin && (
    //                     <>
//                         <input
//                             type="email"
//                             name="email"
//                             onChange={formik.handleChange}
//                             value={formik.values.email}
//                             placeholder="Email"
//                         />
//                         
{/* //                 )} */}
{/* //                 <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
//             </form> */}
{/* //             {serverError && <p>Error: {serverError}</p>}
                <input */}
{/* //                     </> */}
    </div>
    );
}

export default Reading;