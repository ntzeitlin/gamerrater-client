import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewGameForm = () => {
    const initialGameState = {
        title: "",
        year_released: 1990,
        description: "",
        designer: "",
        number_of_players: 0,
        estimated_playtime: 0,
        recommended_age: 0,
        categories: [],
    };

    const [allCategories, setAllCategories] = useState([
        { id: 1, label: "Place Holder" },
    ]);

    const [game, setGame] = useState(initialGameState);
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
    }, []);

    const createGame = async (evt) => {
        evt.preventDefault();

        await fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        });

        navigate(`/games`);
    };

    return (
        <Section>
            <Container>
                <form onSubmit={() => {}}>
                    <Heading>New Game Form</Heading>
                    <fieldset>
                        <label>Game Title:</label>
                        <input
                            id="gametitle"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.title = e.target.value;
                                setGame(copy);
                            }}
                            value={game.title}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Category: </label>
                        <select
                            id="categories"
                            name="categories"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.categories = [parseInt(e.target.value)];
                                setGame(copy);
                            }}
                            defaultValue={0}
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
                                const copy = { ...game };
                                copy.year_released = e.target.value;
                                setGame(copy);
                            }}
                            value={game.year_released}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Designer:</label>
                        <input
                            id="gamedesigner"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.designer = e.target.value;
                                setGame(copy);
                            }}
                            value={game.designer}
                        />
                    </fieldset>

                    <fieldset>
                        <label>Number of Players:</label>
                        <input
                            id="gameplayers"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.number_of_players = e.target.value;
                                setGame(copy);
                            }}
                            value={game.number_of_players}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Recommended Age:</label>
                        <input
                            id="gameage"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.recommended_age = e.target.value;
                                setGame(copy);
                            }}
                            value={game.recommended_age}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Estimated Playtime (minutes):</label>
                        <input
                            id="gametime"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.estimated_playtime = e.target.value;
                                setGame(copy);
                            }}
                            value={game.estimated_playtime}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Description:</label>
                        <textarea
                            id="gamedescription"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...game };
                                copy.description = e.target.value;
                                setGame(copy);
                            }}
                            value={game.description}
                        />
                    </fieldset>

                    <fieldset>
                        <button type="submit" onClick={createGame}>
                            Submit Game
                        </button>
                    </fieldset>
                </form>
            </Container>
        </Section>
    );
};
