import { useState } from "react";
import { Button } from "react-bootstrap";
import getPolygons from "./getPolygons";
import { usePolygonInfo, usePolygonInfoUpdate } from "../../context/PolygonContext";
import { useUserInfo, useUserInfoUpdate } from "../../context/UserContext";

export default function AddUserPolygon({
  user,
  setUserPolygons,
  setUserIsAddingNewPolygon,
  userIsAddingNewPolygon,
  polyPoints,
  setPolyPoints,
}) {
  const [text, setText] = useState("");
  const [addingText, setAddingText] = useState(false);

  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()

  
  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

  async function postPolygon() {
    let today = new Date();
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/userpolygons/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          points: polygonInfo.polygonPoints,
          found: today,
          user_id: userInfo.user.id,
          notes: text,
        }),
      }
    );
    await response.json();
    let newData = await getPolygons(userInfo.user.id);


    setPolygonInfo({userPolygons: newData, userIsAddingNewPolygon: false, polygonPoints: undefined})
    setAddingText(false);
  }

  return (
    <>
    {polygonInfo.userIsAddingNewPolygon &&
     <div className="point-menu">
     <div>Click on Map to Choose Locations</div>
     <div>
       {polygonInfo.polygonPoints && polygonInfo.polygonPoints.length > 5  && !addingText && (
         <Button
           className="mt-3"
           variant="link"
           onClick={() => setAddingText(true)}
         >
           Add a Note
         </Button>
       )}
       {addingText && (
         <textarea
           onChange={(e) => setText(e.target.value)}
           className="usertext"
         />
       )}
     </div>

     {polygonInfo.polygonPoints && polygonInfo.polygonPoints.length > 5 && (
       <Button className="mt-3" variant="outline-light" onClick={postPolygon}>
         Confirm
       </Button>
     )}
   </div>}
    </>
   
  );
}
