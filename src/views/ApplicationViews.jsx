import { useEffect, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { AllGames } from "../components/AllGames";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const localGamerRaterUser = localStorage?.getItem("gamer_rater_user");
        setCurrentUser(localGamerRaterUser);
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        {/* <div>Current User Token: {currentUser}</div> */}
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllGames userToken={currentUser} />} />
            </Route>
        </Routes>
    );
};
