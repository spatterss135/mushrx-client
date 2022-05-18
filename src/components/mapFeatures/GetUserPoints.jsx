



export default async function getPoints(setUserPoints, user){
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userpoints/`)
    let rData = await response.json()
    rData = rData.filter(point => point.user_id === user.id)
    setUserPoints(rData)
}


