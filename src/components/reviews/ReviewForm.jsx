import { Container, Heading, Section, Slider } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const initialReviewState = {
        game: gameId,
        comment: "",
        rating: 5,
    };

    const [review, setReview] = useState(initialReviewState);
    const [gameTitle, setGameTitle] = useState("");

    useEffect(() => {
        setGameTitle(location.state);
    }, [location]);

    const submitReview = async (evt) => {
        evt.preventDefault();

        await fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("gamer_rater_user")).token
                }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });

        navigate(`/games/${gameId}`);
    };

    return (
        <Section>
            <Container width="50rem">
                <form onSubmit={() => {}}>
                    <Heading>
                        Reviewing {gameTitle ? gameTitle : "Game"}
                    </Heading>
                    <fieldset>
                        <Heading>Rating: {review.rating} </Heading>
                        <Container>
                            <Slider
                                defaultValue={[review.rating]}
                                max={[10]}
                                onChange={(e) => {
                                    const copy = { ...review };
                                    copy.rating = e.target.value;
                                    setReview(copy);
                                }}
                            />
                        </Container>
                        {/* <input
                            id="gamerating"
                            type="number"
                            min="0"
                            max="10"
                            step="1"
                            required
                            onChange={(e) => {
                                const copy = { ...review };
                                copy.rating = e.target.value;
                                setReview(copy);
                            }}
                        /> */}
                    </fieldset>
                    <fieldset>
                        <label>Review:</label>
                        <div>
                            <textarea
                                cols="93"
                                rows="10"
                                id="gamerating"
                                type="text"
                                onChange={(e) => {
                                    const copy = { ...review };
                                    copy.comment = e.target.value;
                                    setReview(copy);
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <button type="submit" onClick={submitReview}>
                            Submit Review
                        </button>
                    </fieldset>
                </form>
            </Container>
        </Section>
    );
};
