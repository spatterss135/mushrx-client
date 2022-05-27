import { useMapEvents } from "react-leaflet";
import { usePointInfo, usePointInfoUpdate } from "../../context/PointContext";
import { useUserInfo, useUserInfoUpdate } from "../../context/UserContext";
import { usePolygonInfo, usePolygonInfoUpdate } from "../../context/PolygonContext";

export default function GetClickLatLng({
  poly,
  usersPoint,
}) {

  const pointInfo = usePointInfo()
  const setPointInfo = usePointInfoUpdate()

  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()

  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

  // To locate the bad setState() call inside `GetClickLatLng`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
  // if (!latLong){
  //   setlatLong(userLocation)
  // }

  useMapEvents({
    click: (e) => {
      if (!poly && !usersPoint) {
        setPointInfo({latLong: { latitude: e.latlng.lat, longitude: e.latlng.lng }});
      }
      else if (!poly && usersPoint){
        setUserInfo({userLocation:{ latitude: e.latlng.lat, longitude: e.latlng.lng }})
      }
      else {
        setPolygonInfo({polygonPoints: [...polygonInfo.polygonPoints, `${e.latlng.lat}`, `${e.latlng.lng}`]});
      }
    },
  });
  return null;
}
