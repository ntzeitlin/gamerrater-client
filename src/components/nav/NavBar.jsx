import { TabNav } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <TabNav.Root justify="center">
            <TabNav.Link asChild active={location.pathname === "/"}>
                <Link to="/">All Games</Link>
            </TabNav.Link>
            <TabNav.Link asChild>
                {localStorage.getItem("gamer_rater_user") ? (
                    <Link
                        onClick={() => {
                            localStorage.removeItem("gamer_rater_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                ) : (
                    ""
                )}
            </TabNav.Link>
        </TabNav.Root>
        // <ul className="navbar">
        //     <li className="navbar-item">
        //         <Link to="/" className="navbar-link">
        //             All Games
        //         </Link>
        //     </li>
        //     {localStorage.getItem("gamer_rater_user") ? (
        //         <li className="navbar-item navbar-logout">
        //             <Link
        //                 to=""
        //                 className="navbar-link"
        //                 onClick={() => {
        //                     localStorage.removeItem("gamer_rater_user");
        //                     navigate("/login", { replace: true });
        //                 }}
        //             >
        //                 Logout
        //             </Link>
        //         </li>
        //     ) : (
        //         ""
        //     )}
        // </ul>
    );
};
