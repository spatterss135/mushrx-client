import { Button } from "react-bootstrap";
import { useState } from "react";

import { usePointInfo, usePointInfoUpdate } from "../../context/PointContext"
import { useUserInfo, useUserInfoUpdate } from "../../context/UserContext";

export default function AddUserPoint({ user }) {
  const pointInfo = usePointInfo();
  const setPointInfo = usePointInfoUpdate();

  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();
  const [text, setText] = useState("");
  const [addingText, setAddingText] = useState(false);



  async function postPoint() {
    let today = new Date();
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/userpoints/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          latitude: pointInfo.latLong.latitude,
          longitude: pointInfo.latLong.longitude,
          found: today,
          user_id: userInfo.user.id,
          notes: text,
        }),
      }
    );
    let rData = await response.json();
    setAddingText(false);
    setPointInfo({
      userPoints: rData,
      userIsAddingNewMarker: false,
      latLong: undefined,
    });
  }

  return (
    <>
    {pointInfo.userIsAddingNewMarker && <div className="point-menu">
      <div>Click on Map to Choose Locations</div>
      <div>
        {pointInfo.latLong && pointInfo.userIsAddingNewMarker && !addingText && (
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

      {pointInfo.latLong && pointInfo.userIsAddingNewMarker && (
        <Button className="mt-3" variant="outline-light" onClick={postPoint}>
          Confirm
        </Button>
      )}
    </div>}
    
    </>
  );
}
