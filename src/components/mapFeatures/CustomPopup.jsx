import { Button } from "react-bootstrap";

export default function CustomPopup({ marker, dp, user, removeMarker }) {
  if (marker === "userpoint") {
    let year = new Date(dp.found_on).getFullYear();
    let month = new Date(dp.found_on).getMonth() + 1;
    let day = new Date(dp.found_on).getDate();

    let monthName = {
      1: "Jan.",
      2: "Feb.",
      3: "Mar.",
      4: "Apr.",
      5: "May",
      6: "Jun.",
      7: "Jul.",
      8: "Aug.",
      9: "Sep.",
      10: "Oct.",
      11: "Nov.",
      12: "Dec.",
    };
    return (
      <div>
        <div>
          {user.username} found this morel on {monthName[month]} {day}, {year}
        </div>
        <div>{dp.notes}</div>
        <Button
          className="removebtn"
          onClick={() => removeMarker(dp.latitude, dp.longitude, dp.user_id)}
        >
          <img className="trashmancan" src="Icons/rubbish.png" alt="" />
        </Button>
      </div>
    );
  }
}
