import { MapContainer, TileLayer } from "react-leaflet";
import DataPoint from "./mapFeatures/DataPoint";
import CustomPopup from "./mapFeatures/CustomPopup";
import CustumPolygon from "./mapFeatures/CustomPolygon";
import GetClickLatLng from "./functions/GetClickLatLng";

import { useEffect } from "react";

import { usePointInfo, usePointInfoUpdate } from "../context/PointContext";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";
import { usePolygonInfo, usePolygonInfoUpdate } from "../context/PolygonContext";
import { useApiInfo, useApiInfoUpdate } from "../context/ApiContext";

import ClickRemove from "./functions/ClickRemove";

export default function Map({
  setMap,
  map,
  morelData,
  layer,
  setLayer,

}) {

  const pointInfo = usePointInfo()
  const setPointInfo = usePointInfoUpdate()

  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()

  const userInfo = useUserInfo()
  const setUserInfo = useUserInfoUpdate()

  const apiInfo = useApiInfo()
  const setApiInfo = useApiInfoUpdate()

  useEffect(()=> {
    if (!userInfo.user){
      setPointInfo({
        userPoints: undefined,
        latLong: undefined,
        userIsAddingNewMarker: false,
      })
      setPolygonInfo({
        userPolygons: undefined,
        polygonPoints: undefined,
        userIsAddingNewPolygon: false,
        polygonNotes: undefined
      })
    }
  })
  

  useEffect(()=> {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserInfo({userLocation : {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }});
      });
    };
    getLocation();
  }, 
  
  [])
  useEffect(()=> {

    async function getCity() {
      if (userInfo.userLocation) {
        let response = await fetch(
          `https://api.myptv.com/geocoding/v1/locations/by-position/${userInfo.userLocation.latitude}/${userInfo.userLocation.longitude}?language=en`,
          { headers: { apiKey: `${process.env.REACT_APP_GEOCODE}` } }
        );
        let rData = await response.json();
        setUserInfo({userCity: rData.locations[0].address.city})
      }
    }
    getCity();
  }, 
  
  [userInfo.userLocation])



  async function removeMarker(lat, lng, id) {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/userpoints/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ latitude: lat, longitude: lng, user_id: id }),
      }
    );
    let rData = await response.json();
    setPointInfo({userPoints: rData});
  }
  let markers = apiInfo.morels.data.map((dp) => {
    return (
      <DataPoint
        latitude={dp.latitude}
        longitude={dp.longitude}
        popup={dp.found_on}
        type="shroom"
      />
    );
  });
  let userMarker = () => {
    return (
      <DataPoint
        latitude={userInfo.userLocation.latitude}
        longitude={userInfo.userLocation.longitude}
        popup={"Your Location"}
        type="user"
      />
    );
  };
  let userMadeMarkers;
  if (pointInfo.userPoints) {
    userMadeMarkers = pointInfo.userPoints.map((dp) => {
      let popup = (
        <CustomPopup
          dp={dp}
          user={userInfo.user}
          removeMarker={removeMarker}
          marker="userpoint"
        />
      );

      return (
        <DataPoint
          latitude={dp.latitude}
          longitude={dp.longitude}
          popup={popup}
          type="userpoint"
        />
      );
    });
  }

  let userMadePolygons;
  if (polygonInfo.userPolygons) {
    userMadePolygons = polygonInfo.userPolygons.map((poly) => {
      return (
        <CustumPolygon
          points={poly.points}
          text={poly.notes}
          user={userInfo.user}
          id={poly.id}
        />
      );
    });
  }

  let newPolygon = () => {
    let pointsAsNumbers = polygonInfo.polygonPoints.map((p) => Number(p));
    return <CustumPolygon points={pointsAsNumbers} />;
  };

  let newMarker = () => {
    return (
      <DataPoint
        latitude={pointInfo.latLong.latitude}
        longitude={pointInfo.latLong.longitude}
        popup={"New Shroom"}
        type="userpoint"
      />
    );
  };

  const outerBounds = [
    [50, -130],
    [22, -60],
  ];

  return (
    <>
    {userInfo.userLocation && <MapContainer
      ref={setMap}
      maxBounds={outerBounds}
      center={[userInfo.userLocation.latitude, userInfo.userLocation.longitude]}
      zoom={8}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        ref={setLayer}
        url={layer}
      />
      {markers}
      {userMadePolygons}
      {userMarker()}
      {userInfo.user && pointInfo.latLong && newMarker()}
      {userInfo.user && polygonInfo.polygonPoints && newPolygon()}
      {userMadeMarkers}
      {userInfo.user && pointInfo.userIsAddingNewMarker && (
        <GetClickLatLng poly={false} />
      )}
      {userInfo.user && polygonInfo.userIsAddingNewPolygon && (
        <GetClickLatLng
          poly={true}
        />
      )}
      {userInfo.userChangingLocation && <GetClickLatLng  poly={false} usersPoint={true} />}
      {polygonInfo.polygonNotes && <ClickRemove />}
    </MapContainer>}
    </>
    
  );
}
