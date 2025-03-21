export const getAllGames = async (token) => {
    const response = await fetch('http://localhost:8000/games', {
        method: 'GET',
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}


export const getGameDetail = async (token, gameid) => {
    const response = await fetch(`http://localhost:8000/games/${gameid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}