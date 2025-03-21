import { useEffect, useState } from "react";
import { getAllGames } from "../../services/gameService";
import { Box, Card, Container, Heading, Section, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const AllGames = ({ userToken }) => {
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        if (userToken) {
            fetchAndSetGames();
        }
    }, [userToken]);

    const fetchAndSetGames = () => {
        getAllGames(userToken).then((data) => {
            setGameList(data);
        });
    };
    return (
        <Section>
            <Container>
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
