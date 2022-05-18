
import { Polygon } from "react-leaflet";


export default function CustumPolygon({points, text, polygonNotes, 
    setPolygonNotes, id, user}){

    // function

    let pointsArr = []
    let smallerArr = []
    let j = 0
    for (let i=0;i<points.length;i++){
        if (j===2){
            pointsArr.push(smallerArr)
            smallerArr = []
            j = 0
            
        }
        smallerArr.push(points[i])
        j++
        if (i === points.length-1)pointsArr.push(smallerArr)
        
    }

    return (
        <Polygon positions={pointsArr} eventHandlers={{
            click: (e) => {
              setPolygonNotes({'text':text, id, user})
            },
          }}/> 
    )
}