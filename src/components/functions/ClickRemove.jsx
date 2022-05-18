
import { useMapEvents } from "react-leaflet"

export default function ClickRemove({setPolygonNotes}){

    useMapEvents({
        click: (e) => {setPolygonNotes(undefined)}
    })
}