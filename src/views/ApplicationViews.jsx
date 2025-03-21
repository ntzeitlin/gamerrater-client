import { useEffect, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { AllGames } from "../components/games/AllGames";
import { GameDetail } from "../components/games/gameDetail";

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
                        <div>Current User Token: {currentUser}</div>
                        <Outlet />
                    </>
                }
            >
                <Route path="games">
                    <Route
                        index
                        element={<AllGames userToken={currentUser} />}
                    />
                    <Route
                        path=":gameId"
                        element={<GameDetail userToken={currentUser} />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};
