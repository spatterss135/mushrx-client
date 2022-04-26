import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import DataPoint from './mapFeatures/DataPoint';
import * as L from "leaflet";
export default function Map({morelData, userLocation}){

    
    let markers = morelData.map(dp => {
        return (
            <DataPoint latitude={dp.latitude} longitude={dp.longitude} popup={dp.found_on} type='shroom'/>
        )
    })
    let user = () => {
        return (
            <DataPoint latitude={userLocation.latitude} longitude={userLocation.longitude}  popup={'Your Location'} type='user'/>
        )
    }
    
    return(
        
        <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={8} scrollWheelZoom={false}>
            <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {markers}
            {user()}
        </MapContainer>
    )}