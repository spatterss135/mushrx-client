import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import DataPoint from './mapFeatures/DataPoint';
import * as L from "leaflet";
import GetClickLatLng from './functions/GetClickLatLng';

export default function Map({user, morelData, userLocation, setlatLong, latLong, userIsAddingNewMarker, userPoints, setUserPoints}){

    async function removeMarker(lat,lng, id){
        let response = await fetch('http://localhost:5000/userpoints/',   {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
    
                  },
                 body: JSON.stringify({latitude:lat, longitude:lng, user_id:id})
            })
            let rData = await response.json()
            setUserPoints(rData)
        
    }
    let markers = morelData.map(dp => {
        return (
            <DataPoint latitude={dp.latitude} longitude={dp.longitude} popup={dp.found_on} type='shroom'/>
        )
    })
    let userMarker = () => {
        return (
            <DataPoint latitude={userLocation.latitude} longitude={userLocation.longitude}  popup={'Your Location'} type='user'/>
        )
    }
    let userMadeMarkers;
    if (userPoints){
        
        userMadeMarkers = userPoints.map(dp => {
            let popup = <div>
                            <div>{user.username}{user.id}</div>
                            <button onClick={()=> removeMarker(dp.latitude, dp.longitude, dp.user_id)}>Remove</button>
                        </div>
            
        return (
            <DataPoint latitude={dp.latitude} longitude={dp.longitude} popup={popup} type='userpoint'/>
        )
    })}

    let newMarker = () => {
        return (
            <DataPoint latitude={latLong.latitude} longitude={latLong.longitude}  popup={'New Shroom'} type='userpoint'/>
        )
    }

    const outerBounds = [
        [50,  -130],
        [22, -60],
      ]
    
    
    return(
        
        <MapContainer maxBounds={outerBounds} center={[userLocation.latitude, userLocation.longitude]} zoom={8} scrollWheelZoom={false}>
            <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {markers}
            {userMarker()}
            {user && latLong && newMarker()}
            {userMadeMarkers}
            {user && userIsAddingNewMarker &&<GetClickLatLng userLocation={userLocation} setlatLong={setlatLong} latLong={latLong}/>}
        </MapContainer>
    )}