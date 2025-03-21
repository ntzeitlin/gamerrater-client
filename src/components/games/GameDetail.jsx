import { useEffect, useState } from "react";
import { getGameDetail } from "../../services/gameService";
import {
    Box,
    Card,
    Container,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { useParams } from "react-router-dom";

export const GameDetail = ({ userToken }) => {
    const [gameDetail, setGameDetail] = useState([]);

    const { gameId } = useParams();

    // QUESTION: Should I be grabbing the userToken in each view?
    // Currently, when page is refreshed, data disappears.

    useEffect(() => {
        if (userToken && gameId) {
            getGameDetail(userToken, gameId).then((data) => {
                setGameDetail(data);
            });
        }
    }, []);

    return (
        <Section>
            <Container>
                <Card key={gameDetail?.id} m="3">
                    <Grid columns="2">
                        <Box>
                            <Heading>{gameDetail?.title}</Heading>
                            <Heading size="4">
                                {gameDetail?.designer},{" "}
                                {gameDetail?.year_released}
                            </Heading>
                            <Text as="p">{gameDetail?.description}</Text>
                        </Box>
                        <Box>
                            <Text as="p">
                                {" "}
                                Players: {gameDetail?.number_of_players}
                            </Text>
                            <Text as="p">
                                Estimated Playtime:{" "}
                                {gameDetail?.estimated_playtime} minutes
                            </Text>
                            <Text as="p">
                                Recommended Age: {gameDetail?.recommended_age}
                            </Text>
                            <Text>
                                Categories:{" "}
                                {gameDetail?.categories
                                    ?.map((category) => category.label)
                                    .join(", ")}
                            </Text>
                        </Box>
                    </Grid>
                </Card>
            </Container>
        </Section>
    );
};

// Title
// Designer
// Year released
// Number of players
// Estimated time to play
// Age recommendation
// Categories
