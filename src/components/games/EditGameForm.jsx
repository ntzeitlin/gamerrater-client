import { Container, Heading, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EditGameForm = () => {
    const [gameData, setGameData] = useState({
        title: "",
        year_released: 1990,
        description: "",
        designer: "",
        number_of_players: 0,
        estimated_playtime: 0,
        recommended_age: 0,
        categories: [],
    });

    const [allCategories, setAllCategories] = useState([
        { id: 1, label: "Place Holder" },
    ]);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchCategories = async () => {
        const response = await fetch("http://localhost:8000/categories", {
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
            },
        });
        const data = await response.json();
        setAllCategories(data);
    };

    useEffect(() => {
        fetchCategories();
        setGameData(location.state);
    }, [location]);

    const updateGame = async (evt) => {
        evt.preventDefault();

        await fetch(`http://localhost:8000/games/${gameData.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
        });

        navigate(-1);
    };

    return (
        <Section>
            <Container>
                <form onSubmit={() => {}}>
                    <Heading>Edit Game Form</Heading>
                    <fieldset>
                        <label>Game Title:</label>
                        <input
                            id="gametitle"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.title = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.title}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Category: </label>
                        <select
                            id="categories"
                            name="categories"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.categories = [parseInt(e.target.value)];
                                setGameData(copy);
                            }}
                            value={gameData.categories[0]}
                        >
                            <option value={0} disabled>
                                Select a Category
                            </option>
                            {allCategories.map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Year Released:</label>
                        <input
                            id="gameyear"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.year_released = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.year_released}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Designer:</label>
                        <input
                            id="gamedesigner"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.designer = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.designer}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Number of Players:</label>
                        <input
                            id="gameplayers"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.number_of_players = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.number_of_players}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Recommended Age:</label>
                        <input
                            id="gameage"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.recommended_age = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.recommended_age}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Estimated Playtime (minutes):</label>
                        <input
                            id="gametime"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.estimated_playtime = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.estimated_playtime}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Description:</label>
                        <textarea
                            id="gamedescription"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...gameData };
                                copy.description = e.target.value;
                                setGameData(copy);
                            }}
                            value={gameData.description}
                        />
                    </fieldset>

                    <fieldset>
                        <button type="submit" onClick={updateGame}>
                            Submit Game
                        </button>
                    </fieldset>
                </form>
            </Container>
        </Section>
    );
};
