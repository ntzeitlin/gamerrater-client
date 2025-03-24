import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { AllGames } from "../components/games/AllGames";
import { GameDetail } from "../components/games/gameDetail";
import { NewGameForm } from "../components/games/NewGameForm";
import { ReviewForm } from "../components/reviews/ReviewForm";
import { EditGameForm } from "../components/games/EditGameForm";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route path="games">
                    <Route index element={<AllGames />} />
                    <Route path=":gameId">
                        <Route index element={<GameDetail />} />
                        <Route path="review" element={<ReviewForm />} />
                        <Route path="edit" element={<EditGameForm />} />
                    </Route>
                    <Route path="new" element={<NewGameForm />} />
                </Route>
            </Route>
        </Routes>
    );
};
