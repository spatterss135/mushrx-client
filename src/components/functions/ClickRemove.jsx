
import { useMapEvents } from "react-leaflet"

export default function ClickRemove({setPolygonNotes}){

    const map = useMapEvents({
        click: (e) => {setPolygonNotes(undefined)}
    })
}