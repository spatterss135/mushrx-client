export default async function getPolygons(setUserPolygons, user) {
  let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userpolygons/`);
  let rData = await response.json();

  await rData.filter((point) => {
    return point.user_id === user.id;
  });

  

  rData = await rData.map((dp) => {
    return {
      id: dp.id,
      user_id: dp.user_id,
      found_on: dp.found_on,
      notes: dp.notes,
      points: dp.points.slice(1).slice(0, -1).split(","),
    };
  });
  console.log(rData)

  rData.forEach(data => {
      data.points = data.points.map(num => Number(num))
  })
  console.log(rData)
  setUserPolygons(rData);
}
