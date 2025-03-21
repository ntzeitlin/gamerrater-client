import { useEffect, useState } from "react";
import { getGameDetail } from "../../services/gameService";
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";

export const GameDetail = () => {
    const [gameDetail, setGameDetail] = useState([]);

    const navigate = useNavigate();
    const { gameId } = useParams();

    useEffect(() => {
        const userToken = JSON.parse(
            localStorage.getItem("gamer_rater_user")
        ).token;

        if (userToken && gameId) {
            getGameDetail(userToken, gameId).then((data) => {
                setGameDetail(data);
            });
        }
    }, [gameId]);

    return (
        <Section>
            <Container>
                <Heading>Game:</Heading>
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
                    <Button
                        onClick={() => {
                            navigate("review");
                        }}
                    >
                        Review Game
                    </Button>
                </Card>
                <Heading>Reviews:</Heading>
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
