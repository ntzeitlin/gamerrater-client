import { useEffect, useState } from "react";
import { getAllGames } from "../../services/gameService";
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    Select,
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

    const handleSort = (evt) => {
        fetch(`http://localhost:8000/games?orderby=${evt}`, {
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
                <Box>
                    <Flex align="center">
                        <Heading size="2" mr="2">
                            Search:
                        </Heading>
                        <input
                            type="text"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            ml="2"
                            size="1"
                            onClick={() => {
                                handleSearch();
                            }}
                        >
                            Search
                        </Button>
                    </Flex>
                </Box>
                <Box>
                    <Flex align="center">
                        <Heading size="2" mr="2">
                            Sort By:
                        </Heading>
                        <Select.Root
                            onValueChange={(evt) => {
                                handleSort(evt);
                            }}
                        >
                            <Select.Trigger placeholder="Sort by..." />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Item value="title">
                                        Title
                                    </Select.Item>
                                    <Select.Item value="year_released">
                                        Year released
                                    </Select.Item>
                                    <Select.Item value="estimated_playtime">
                                        Estimated Playtime
                                    </Select.Item>
                                    <Select.Item value="designer">
                                        Designer
                                    </Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                </Box>
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
