import { useMapEvents } from "react-leaflet";

import { usePolygonInfo, usePolygonInfoUpdate } from "../../context/PolygonContext";

export default function ClickRemove() {

  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()
  useMapEvents({
    click: (e) => {
      setPolygonInfo({polygonNotes: undefined});
    },
  });
}
