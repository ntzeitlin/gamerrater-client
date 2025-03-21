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
import { getReviewsByGameId } from "../../services/reviewService";

export const GameDetail = () => {
    const [gameDetail, setGameDetail] = useState([]);
    const [gameReviews, setGameReviews] = useState([]);

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
            getReviewsByGameId(userToken, gameId).then((data) => {
                setGameReviews(data);
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
                    <Box>
                        <Button
                            onClick={() => {
                                navigate("review", { state: gameDetail.title });
                            }}
                        >
                            Review Game
                        </Button>
                        {gameDetail.is_owner ? (
                            <Button ml="2" color="red">
                                Edit Me
                            </Button>
                        ) : (
                            ""
                        )}
                    </Box>
                </Card>
                <Heading>Reviews:</Heading>
                {gameReviews.map((review) => (
                    <Card m="3" key={review.id}>
                        <Text as="p">
                            "{review.comment}" | {review.rating} / 10
                        </Text>
                        <Text as="p">
                            {"  "} -- {review.user.first_name}{" "}
                            {review.user.last_name}{" "}
                        </Text>
                    </Card>
                ))}
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
