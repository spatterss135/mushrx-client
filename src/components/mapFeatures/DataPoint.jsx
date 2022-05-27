import { Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
export default function DataPoint({ latitude, longitude, popup, type }) {
  let iconChoice;

  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const blueIcon = L.Icon.Default.prototype;

  // For the user
  const greenIcon = new LeafIcon({
    iconUrl: require("../../Static/Icons/user.png"),
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const redIcon = new LeafIcon({
    iconUrl: require("../../Static/Icons/userpoint.png"),
    iconSize: [34, 41], // size of the icon
    iconAnchor: [17, 41],
    popupAnchor: [0, -41],
  });
  if (type === "user") {
    iconChoice = greenIcon;
  } else if (type === "userpoint") {
    iconChoice = redIcon;
  } else {
    iconChoice = blueIcon;
  }

  return (
    <Marker position={[latitude, longitude]} icon={iconChoice}>
      <Popup>{popup}</Popup>
    </Marker>
  );
}
