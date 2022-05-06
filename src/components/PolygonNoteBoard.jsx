
import { Button } from "react-bootstrap"
import getPolygons from "./mapFeatures/getPolygons";

export default function PolygonNoteBoard({text, setUserPolygons, setUserIsAddingNewPolygon, setPolygonNotes}){
    console.log(text)
    async function removePolygon(user, id) {
        let response = await fetch("http://localhost:5000/userpolygons/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({'user':text.user.id, 'id':text.id}),
        });
        let rData = await response.json()
        await getPolygons(setUserPolygons, user)
        setUserIsAddingNewPolygon(false)
        setPolygonNotes(undefined)
      }
    return (
        <div className="noteboard">
            <div>Your Notes on Polygon #?:</div>
            <div>{text.text}</div>
            <Button className="removebtn"
          onClick={() => removePolygon(text.user, text.id)}
        >
          <img className='trashmancan' src="Icons/rubbish.png" alt="" />
        </Button>
        </div>
    )
}
