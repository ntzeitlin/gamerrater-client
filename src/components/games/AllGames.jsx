import { useEffect, useState } from "react";
import { getAllGames } from "../../services/gameService";
import {
    Box,
    Button,
    Card,
    Container,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const AllGames = () => {
    const [gameList, setGameList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAndSetGames();
    }, []);

    const fetchAndSetGames = () => {
        const userToken = JSON.parse(
            localStorage.getItem("gamer_rater_user")
        ).token;

        getAllGames(userToken).then((data) => {
            setGameList(data);
        });
    };

    const handleSearch = () => {
        fetch(`http://localhost:8000/games?q=${search}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setGameList(data));
    };

    return (
        <Section>
            <Container>
                Search:{" "}
                <input
                    type="text"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <Button
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    Search
                </Button>
                <Heading>Games:</Heading>
                {gameList?.map((game) => (
                    <Card key={game.id} m="3">
                        <Box>
                            <Link to={`/games/${game.id}`}>
                                <Heading>{game.title}</Heading>
                            </Link>
                            <Heading size="4">{game.designer}</Heading>
                            <Text as="p">{game.description}</Text>
                        </Box>
                    </Card>
                ))}
            </Container>
        </Section>
    );
};
