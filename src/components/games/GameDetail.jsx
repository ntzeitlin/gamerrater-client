import { useEffect, useState } from "react";
import { getCategoryName, getGameDetail } from "../../services/gameService";
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
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
    const [categoryName, setCategoryName] = useState([]);
    const [baseString, setBaseString] = useState("");

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

    useEffect(() => {
        const userToken = JSON.parse(
            localStorage.getItem("gamer_rater_user")
        ).token;
        if (gameDetail.categories) {
            getCategoryName(userToken, gameDetail?.categories[0]).then((data) =>
                setCategoryName([data])
            );
        }
    }, [gameDetail.categories]);

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(file);
    };

    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            setBaseString(base64ImageString);
        });
    };

    const uploadImage = async () => {
        await fetch("http://localhost:8000/pictures", {
            method: "POST",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                game_id: gameId,
                game_image: baseString,
            }),
        });
        navigate(0);
    };

    const handleDelete = async () => {
        await fetch(`http://localhost:8000/games/${gameId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
            },
        }).then(() => navigate(-1));
    };

    return (
        <Section>
            <Container>
                <Heading>Game:</Heading>
                <Card key={gameDetail?.id} m="3">
                    <Grid columns="2">
                        <Box>
                            <Heading>
                                {gameDetail?.title} | Average Rating:{" "}
                                {gameDetail?.average_rating}
                            </Heading>
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
                                {categoryName
                                    ?.map((category) => category.label)
                                    .join(", ")}
                            </Text>
                            <Box>
                                Upload Picture:{" "}
                                <input
                                    type="file"
                                    id="game_image"
                                    onChange={createGameImageString}
                                />
                                <input
                                    type="hidden"
                                    name="game_id"
                                    value={gameDetail.id}
                                />
                                <button
                                    onClick={() => {
                                        if (baseString) {
                                            uploadImage();
                                        } else {
                                            window.alert(
                                                "Choose a file to upload"
                                            );
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </Box>
                        </Box>
                    </Grid>
                    <Flex>
                        <Box>
                            <Button
                                onClick={() => {
                                    navigate("review", {
                                        state: gameDetail.title,
                                    });
                                }}
                            >
                                Review Game
                            </Button>
                            {gameDetail.is_owner ? (
                                <>
                                    <Button
                                        ml="2"
                                        color="green"
                                        onClick={() => {
                                            navigate("edit", {
                                                state: gameDetail,
                                            });
                                        }}
                                    >
                                        Edit Game
                                    </Button>
                                    <Button
                                        color="red"
                                        ml="2"
                                        onClick={() => {
                                            handleDelete();
                                        }}
                                    >
                                        Delete Game
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </Box>
                    </Flex>
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
                <Heading>Pictures:</Heading>
                <Grid columns="3">
                    {gameDetail?.pictures?.map((picture) => (
                        <Card m="1" key={picture.id}>
                            <Flex justify="center">
                                <img width="100px" src={`${picture.picture}`} />
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};
