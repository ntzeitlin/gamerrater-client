import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, set] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        localStorage.setItem("gamer_rater_user", email);

        navigate("/");
    };

    return (
        <main className="auth-container">
            <section>
                <form className="auth-form" onSubmit={handleLogin}>
                    <h1 className="header">Gamer Rater</h1>
                    <h2>Please sign in</h2>
                    <fieldset className="auth-fieldset">
                        <div>
                            <input
                                type="text"
                                value={email}
                                className="auth-form-input"
                                onChange={(evt) => set(evt.target.value)}
                                placeholder="user token"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset className="auth-fieldset">
                        <div>
                            <button type="submit">Sign in</button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="register-link">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    );
};
