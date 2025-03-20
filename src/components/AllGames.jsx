import { useEffect, useState } from "react";
import { getAllGames } from "../services/gameService";
import {
    Box,
    Card,
    Container,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";

export const AllGames = ({ userToken }) => {
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        if (userToken) {
            getAllGames(userToken).then((data) => {
                setGameList(data);
            });
        }
    }, [userToken]);
    return (
        <Section>
            <Container>
                {gameList?.map((game) => (
                    <Card key={game.id} m="3">
                        <Grid columns="2">
                            <Box>
                                <Heading>{game.title}</Heading>
                                <Heading size="4">{game.designer}</Heading>
                                <Text as="p">{game.description}</Text>
                            </Box>
                            <Box>
                                <Text as="p">
                                    Number of Players: {game.number_of_players}
                                </Text>
                                <Text as="p">
                                    Estimated Playtime:{" "}
                                    {game.estimated_playtime}
                                </Text>
                                <Text as="p">
                                    Recommended Age: {game.recommended_age}
                                </Text>
                            </Box>
                        </Grid>
                    </Card>
                ))}
            </Container>
        </Section>
    );
};
