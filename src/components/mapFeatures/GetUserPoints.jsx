



export default async function getPoints(setUserPoints, user){
    let response = await fetch('http://localhost:5000/userpoints/')
    let rData = await response.json()
    rData = rData.filter(point => point.user_id == user.id)
    setUserPoints(rData)
}


