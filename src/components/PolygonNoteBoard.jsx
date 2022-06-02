import { Button } from "react-bootstrap";
import getPolygons from "./mapFeatures/getPolygons";

import { usePolygonInfo, usePolygonInfoUpdate } from "../context/PolygonContext";
import { useUserInfo } from "../context/UserContext";

export default function PolygonNoteBoard({
  text,
}) {
  
  const userInfo = useUserInfo()
  
  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()

  async function removePolygon(user, id) {

    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/userpolygons/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ user: user.id, id: id }),
      }
    );
    await response.json();
    let data = await getPolygons(userInfo.user.id);
    setPolygonInfo({userPolygons: data, setUserIsAddingNewPolygon: false, polygonNotes: undefined})
  }
  return (
    <>
    {polygonInfo.polygonNotes && 
    <div className="noteboard">
    <div>Your Notes on Polygon #?:</div>
    <div>{polygonInfo.polygonNotes.text}</div>
    <Button
      className="removebtn"
      onClick={() => removePolygon(polygonInfo.polygonNotes.user, polygonInfo.polygonNotes.id)}
    >
      <img className="trashmancan" src="Icons/rubbish.png" alt="" />
    </Button>
  </div>}
    </>
    
  );
}
