import { useMap, useMapEvents } from "react-leaflet"
import { useState } from "react"


export default function GetClickLatLng({setlatLong, polyPoints, setPolyPoints, poly}){
    
     // To locate the bad setState() call inside `GetClickLatLng`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    // if (!latLong){
    //   setlatLong(userLocation)
    // }
    
    const map = useMapEvents({
        click: (e) => {
          if(!poly){
          setlatLong({"latitude":e.latlng.lat, "longitude": e.latlng.lng})
          }
          else{
            setPolyPoints([...polyPoints, `${e.latlng.lat}`, `${e.latlng.lng}`])
          }
        }
      })
      return null
    
}