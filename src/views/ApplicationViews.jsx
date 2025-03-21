import { useEffect, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { AllGames } from "../components/games/AllGames";
import { GameDetail } from "../components/games/gameDetail";
import { NewGameForm } from "../components/games/NewGameForm";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const localGamerRaterUser = JSON.parse(
            localStorage.getItem("gamer_rater_user")
        ).token;
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
                    <Route path="new" element={<NewGameForm />} />
                </Route>
            </Route>
        </Routes>
    );
};
