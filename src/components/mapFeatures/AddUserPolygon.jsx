import { useState } from "react";
import { Button } from "react-bootstrap";
import getPolygons from "./getPolygons";

export default function AddUserPolygon({user, setUserPolygons, setUserIsAddingNewPolygon, userIsAddingNewPolygon, polyPoints,
    setPolyPoints}) {
  
  const [text, setText] = useState("");
  const [addingText, setAddingText] = useState(false);

  async function postPolygon(){
    let today = new Date()
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userpolygons/',   {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'

              },
             body: JSON.stringify({points:polyPoints, found:today, user_id:user.id, notes: text})
        })
        let rData = await response.json()
        await getPolygons(setUserPolygons, user)
        setUserIsAddingNewPolygon(false)
        setPolyPoints(undefined)
        setAddingText(false)
}

  return (
    <div className="point-menu">
      <div>Click on Map to Choose Locations</div>
      <div>
        {polyPoints.length > 5 && userIsAddingNewPolygon && !addingText && (
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

      {polyPoints.length > 5 && userIsAddingNewPolygon && (
        <Button className="mt-3" variant="outline-light" onClick={postPolygon}>
          Confirm
        </Button>
      )}
    </div>
  );
}
