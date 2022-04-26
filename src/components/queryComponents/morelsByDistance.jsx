import DistanceCalculator from "../functions/DistanceCalculator"
import FilterYear from "./FilterYear"
import { useState } from "react"

export default function MorelsByDistance({userLocation, years, setFilteredMorels, setYears}){
    const [distanceQuery, setDistanceQuery] = useState(50)

    async function morelsWithinCertainDistance(){
        async function getMorelMarkers(){
          const response = await fetch('http://localhost:5000')
          const rData = await response.json()
          return rData
        }
        let allShrooms = await getMorelMarkers()
        let tempMorels = []
        for (let i=0;i<allShrooms.length;i++){
          let distance = DistanceCalculator(userLocation, allShrooms[i])
          let shroomYear = new Date(allShrooms[i].found_on).getFullYear()
          if (distance < distanceQuery && years.includes(shroomYear)){
            tempMorels.push(allShrooms[i])
          }
        }
        setFilteredMorels(tempMorels)
        
      }

    return (
        <div className="mushroom-query">
            <button className="dropdown-button">Show morels within...</button>
            <div className="dropdown-menu">
            <div >
            <input type="range" min="25" max="200" defaultValue={distanceQuery} onChange={(e)=> setDistanceQuery(e.target.value)}/>
            <div>{distanceQuery} miles</div>
            </div>
            <FilterYear setYears={setYears} years={years}/>
            <button onClick={morelsWithinCertainDistance}>Click me For Morels</button>
            </div>
             
        </div>
    )
}