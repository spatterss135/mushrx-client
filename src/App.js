import "./App.css";
import ToolMenu from "./components/ToolMenu";
import moment from "moment";
import Map from "./components/Map";
import FriendBox from "./components/FriendBox/FriendBox";
import LoginForm from "./components/LoginForm";
import AddUserPoint from "./components/mapFeatures/AddUserPoint";
import AddUserPolygon from "./components/mapFeatures/AddUserPolygon";
import MapTools from "./components/MapTools";
import { useState, useEffect } from "react";
import sampleWeatherData from "./practice";
import PolygonNoteBoard from "./components/PolygonNoteBoard";
import UserChangingLocationPanel from "./components/UserChangeLocationPanel";

import { LoginProvider } from "./context/LoginContext";
import { PointProvider } from "./context/PointContext";
import { UserProvider } from "./context/UserContext";
import { PolygonProvider } from "./context/PolygonContext";
import { ApiProvider } from "./context/ApiContext";

function App() {
  // 1
  // Toggle for is user is trying to signup/login. Disables certain components when true
  // const [loginFormUp, setLoginFormUp] = useState(false);

  // Waypoints for logged in user
  // const [userPoints, setUserPoints] = useState(undefined);
  // Temporary variable storing lat/long for new waypoint
  // const [latLong, setlatLong] = useState(undefined);
  // const [userIsAddingNewMarker, setUserIsAddingNewMarker] = useState(false);

  // Info on user who is logged in
  // const [user, setUser] = useState(undefined);
  // Get entire user DB (Is this bad practice?)
  // const [userDB, setUserDB] = useState([]);

  // Weather Data, currently always retrieves 5-years of data
  // const [weatherData, setWeatherData] = useState(undefined);
  // Separate Api call for soil temp and moisture, only can retrieve todays data
  // const [soilData, setSoilData] = useState(undefined);
  // Years of data for morel sightings. Default query is all years of data, but the component FilterYear changes this.
  // const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017]);
  // Waypoints for morels within query parameters
  // const [filteredMorels, setFilteredMorels] = useState([]);
  // Uses geolocation to locate user
  // const [userLocation, setUserLocation] = useState(undefined);
  // Boolean to pull up panel for changing location (only available to users)
  // const [userChangingLocation, setUserChangingLocation] = useState(false);
  // Boolean to see if user has changed location, in order to prevent multiple api calls
  // const [userHasChangedLocations, setUserHasChangedLocations] = useState(true);
  // Toggle for adding new waypoint

  // Toggle for adding new polygon
  // const [userIsAddingNewPolygon, setUserIsAddingNewPolygon] = useState(false);

  // Temporary array to hold coordinates while making new polygon
  // const [polyPoints, setPolyPoints] = useState(undefined);
  // Polygons for logged in user
  // const [userPolygons, setUserPolygons] = useState(undefined);
  // 15
  // Get date string for last 5 days, for the last 5 years, to use in weather queries
  // const [dates, setDates] = useState([]);
  // variable to reference map object
  const [map, setMap] = useState(null);
  // url for layer displayed on map
  const [layer, setLayer] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  // Api to get city closest to user's location
  // const [userCity, setUserCity] = useState("Pudding");
  // Text for polygon being made or selected polygon
  // const [polygonNotes, setPolygonNotes] = useState(undefined);
  // Variable for changing ToolMenu
  const [buttonType, setButtonType] = useState("outline-dark");

  const [friendBoxUp, setFriendBoxUp] = useState(false);

  function changeLayer(e) {
    layer.setUrl(e);
    if (e !== "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      setButtonType("light");
    else {
      setButtonType("outline-dark");
    }
  }

  return (
    <div className="App">
      <UserProvider>
        {friendBoxUp && <FriendBox friendBoxUp={friendBoxUp}/>}
        <PolygonProvider>
          <PointProvider>
            <ApiProvider>
              <Map setMap={setMap} layer={layer} setLayer={setLayer} />
              <UserChangingLocationPanel />
              <LoginProvider>
                <ToolMenu
                  sampleWeatherData={sampleWeatherData}
                  map={map}
                  setFriendBoxUp={setFriendBoxUp}
                  friendBoxUp={friendBoxUp}
                />

                <LoginForm />
              </LoginProvider>
            </ApiProvider>

            <AddUserPoint />
            <MapTools
              map={map}
              changeLayer={changeLayer}
              buttonType={buttonType}
            />
          </PointProvider>
          <AddUserPolygon />

          <PolygonNoteBoard />
        </PolygonProvider>
      </UserProvider>
    </div>
  );
}

export default App;
