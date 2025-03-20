import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate();

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/" className="navbar-link">
                    All Posts
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/posts/mine" className="navbar-link">
                    My Posts
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/posts/favorite" className="navbar-link">
                    Favorite
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/posts/new" className="navbar-link">
                    New Post
                </Link>
            </li>
            <li className="navbar-item">
                <Link to={`/profile/${currentUser.id}`} className="navbar-link">
                    Profile
                </Link>
            </li>
            {localStorage.getItem("learning_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        to=""
                        className="navbar-link"
                        onClick={() => {
                            localStorage.removeItem("learning_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    );
};
