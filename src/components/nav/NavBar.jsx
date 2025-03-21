import { TabNav } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <TabNav.Root justify="center">
            <TabNav.Link asChild active={location.pathname === "/games"}>
                <Link to="/games">Games</Link>
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
    );
};
