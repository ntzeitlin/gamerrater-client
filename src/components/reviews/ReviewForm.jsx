import { Container, Heading, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const initialReviewState = {
        game: gameId,
        comment: "",
        rating: null,
    };

    const [review, setReview] = useState(initialReviewState);

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
            <Container>
                <form onSubmit={() => {}}>
                    <Heading>Review Game</Heading>
                    <fieldset>
                        <label>Rating:</label>
                        <input
                            id="gamerating"
                            type="number"
                            onChange={(e) => {
                                const copy = { ...review };
                                copy.rating = e.target.value;
                                setReview(copy);
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Rating:</label>
                        <textarea
                            id="gamerating"
                            type="text"
                            onChange={(e) => {
                                const copy = { ...review };
                                copy.comment = e.target.value;
                                setReview(copy);
                            }}
                        />
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
