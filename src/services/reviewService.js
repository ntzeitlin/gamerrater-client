export const getReviewsByGameId = async (userToken, gameId) => {
    const response = await fetch('http://localhost:8000/reviews', {
        method: 'GET',
        headers: {
            "Authorization": `Token ${userToken}`,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    const filterData = data.filter(review => parseInt(review.game.id) === parseInt(gameId))

    return filterData
}