import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
    const [email, setEmail] = useState("admina@straytor.com");
    const [password, setPassword] = useState("straytor");
    const [firstName, setFirstName] = useState("Admina");
    const [lastName, setLastName] = useState("Straytor");
    const existDialog = useRef();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/register`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((authInfo) => {
                if (authInfo && authInfo.token) {
                    localStorage.setItem(
                        "gamer_rater_user",
                        JSON.stringify(authInfo)
                    );
                    navigate("/");
                } else {
                    existDialog.current.showModal();
                }
            });
    };

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User already exists</div>
                <button
                    className="button--close"
                    onClick={(e) => existDialog.current.close()}
                >
                    Close
                </button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleRegister}>
                    <h1 className="text-4xl mt-7 mb-3">Gamer Rater</h1>
                    <h2 className="text-xl mb-10">Register new account</h2>
                    <fieldset className="mb-4">
                        <label htmlFor="firstName"> First name </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(evt) => setFirstName(evt.target.value)}
                            className="form-control"
                            placeholder=""
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="lastName"> Last name </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(evt) => setLastName(evt.target.value)}
                            className="form-control"
                            placeholder=""
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input
                            type="email"
                            id="inputEmail"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Password </label>
                        <input
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                    </fieldset>
                    <fieldset>
                        <button
                            type="submit"
                            className="button p-3 rounded-md bg-blue-800 text-blue-100"
                        >
                            Register
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="loginLinks">
                <section className="link--register">
                    <Link
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        to="/login"
                    >
                        Already have an account?
                    </Link>
                </section>
            </div>
        </main>
    );
};

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import { createUser, getUserByEmail } from "../../services/userService";

// export const Register = (props) => {
//     const [user, setUser] = useState({
//         email: "",
//         fullName: "",
//         cohort: 0,
//     });
//     let navigate = useNavigate();

//     const registerNewUser = () => {
//         const newUser = {
//             ...user,
//             cohort: parseInt(user.cohort),
//         };

//         createUser(newUser).then((createdUser) => {
//             if (createdUser.hasOwnProperty("id")) {
//                 localStorage.setItem(
//                     "learning_user",
//                     JSON.stringify({
//                         id: createdUser.id,
//                         staff: createdUser.isStaff,
//                     })
//                 );

//                 navigate("/");
//             }
//         });
//     };

//     const handleRegister = (e) => {
//         e.preventDefault();
//         getUserByEmail(user.email).then((response) => {
//             if (response.length > 0) {
//                 // Duplicate email. No good.
//                 window.alert("Account with that email address already exists");
//             } else {
//                 // Good email, create user.
//                 registerNewUser();
//             }
//         });
//     };

//     const updateUser = (evt) => {
//         const copy = { ...user };
//         copy[evt.target.id] = evt.target.value;
//         setUser(copy);
//     };

//     return (
//         <main className="auth-container">
//             <form className="auth-form" onSubmit={handleRegister}>
//                 <h1 className="header">Gamer Rater</h1>
//                 <h2>Please Register</h2>
//                 <fieldset className="auth-fieldset">
//                     <div>
//                         <input
//                             onChange={updateUser}
//                             type="text"
//                             id="fullName"
//                             className="auth-form-input"
//                             placeholder="Enter your name"
//                             required
//                             autoFocus
//                         />
//                     </div>
//                 </fieldset>
//                 <fieldset className="auth-fieldset">
//                     <div>
//                         <input
//                             onChange={updateUser}
//                             type="email"
//                             id="email"
//                             className="auth-form-input"
//                             placeholder="Email address"
//                             required
//                         />
//                     </div>
//                 </fieldset>
//                 <fieldset className="auth-fieldset">
//                     <div>
//                         <input
//                             onChange={updateUser}
//                             type="number"
//                             id="cohort"
//                             className="auth-form-input"
//                             placeholder="Cohort #"
//                             required
//                         />
//                     </div>
//                 </fieldset>
//                 <fieldset className="auth-fieldset">
//                     <div>
//                         <button type="submit">Register</button>
//                     </div>
//                 </fieldset>
//             </form>
//         </main>
//     );
// };
