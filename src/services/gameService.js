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