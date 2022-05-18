import "./App.css";
import ToolMenu from "./components/ToolMenu";
import moment from "moment";
import Map from "./components/Map";


import LoginForm from "./components/LoginForm";
import AddUserPoint from "./components/mapFeatures/AddUserPoint";
import AddUserPolygon from "./components/mapFeatures/AddUserPolygon";
import MapTools from "./components/MapTools";
import { useState, useEffect } from "react";
import sampleWeatherData from "./practice";
import PolygonNoteBoard from "./components/PolygonNoteBoard";


function App() {
  // 1
  // Toggle for is user is trying to signup/login. Disables certain components when true
  const [loginFormUp, setLoginFormUp] = useState(false);
  // Info on user who is logged in
  const [user, setUser] = useState(undefined);
  // Get entire user DB (Is this bad practice?)
  const [userDB, setUserDB] = useState([]);
  // Waypoints for logged in user
  const [userPoints, setUserPoints] = useState(undefined);
  // Temporary variable storing lat/long for new waypoint
  const [latLong, setlatLong] = useState(undefined);
  // 5
  // Weather Data, currently always retrieves 5-years of data
  const [weatherData, setWeatherData] = useState(undefined);
  // Separate Api call for soil temp and moisture, only can retrieve todays data
  const [soilData, setSoilData] = useState(undefined);
  // Years of data for morel sightings. Default query is all years of data, but the component FilterYear changes this.
  const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017]);
  // Waypoints for morels within query parameters
  const [filteredMorels, setFilteredMorels] = useState([]);
  // Uses geolocation to locate user
  const [userLocation, setUserLocation] = useState(undefined);
  // 10
  // Toggle for adding new waypoint
  const [userIsAddingNewMarker, setUserIsAddingNewMarker] = useState(false);
  // Toggle for adding new polygon
  const [userIsAddingNewPolygon, setUserIsAddingNewPolygon] = useState(false);

  // Temporary array to hold coordinates while making new polygon
  const [polyPoints, setPolyPoints] = useState(undefined);
  // Polygons for logged in user
  const [userPolygons, setUserPolygons] = useState(undefined)
  // 15
  const [dates, setDates] = useState([]);
  // variable to reference map object
  const [map, setMap] = useState(null);
  // url for layer displayed on map
  const [layer, setLayer] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  // Api to get city closest to user's location
  const [userCity, setUserCity] = useState("Pudding");
  // Text for polygon being made or selected polygon
  const [polygonNotes, setPolygonNotes] = useState(undefined)
  // Variable for changing ToolMenu
  const [buttonType, setButtonType] = useState('outline-dark')

  function findUser() {
    map.flyTo([userLocation.latitude, userLocation.longitude], 10);
  }
  
  useEffect(() => {
    dong();
    let fetchUsers = async () => {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
      let rData = await response.json();
      setUserDB(rData);
    };
    fetchUsers();
    let getLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    };
    getLocation();

    let tempDates = [];
    // let d = new Date()
    for (let i = 0; i < 5; i++) {
      let year = new Date(moment().subtract(i, "years")).getFullYear();
      let month = new Date().getMonth() + 1;
      let monthOne = new Date(moment().subtract(4, "days")).getMonth() + 1;
      let day = new Date().getDate();
      let dayOne = new Date(moment().subtract(4, "days")).getDate();

      tempDates.push([
        `${year}-${monthOne}-${dayOne}`,
        `${year}-${month}-${day}`,
      ]);
    }
    setDates(tempDates);
  }, []);

  useEffect(() => {
    async function getCity() {
      if (userLocation) {
        let response = await fetch(
          `https://api.myptv.com/geocoding/v1/locations/by-position/${userLocation.latitude}/${userLocation.longitude}?language=en`,
          { headers: { apiKey: `${process.env.REACT_APP_GEOCODE}` } }
        );
        let rData = await response.json();
        setUserCity(rData.locations[0].address.city);
      }
    }
    getCity();
  }, [userLocation]);


  // Actual function for requesting weather data for last 5 years. Accrues heavy cost via api call
  async function getWeather() {
    const location = `${userLocation.latitude},${userLocation.longitude}`;
    let tempWeatherHoldingObject = {};
    let i = 0;
    let year = new Date().getFullYear();
    while (i < dates.length) {
      // const dateOne = dates[i][0];
      // const dateTwo = dates[i][1];
      const dateOne = ''
      const dateTwo = ''
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateOne}/${dateTwo}?key=${process.env.REACT_APP_API_KEY_TWO}`
      );
      const rData = await response.json();
      tempWeatherHoldingObject[year] = rData;
      i++;
    }
    setWeatherData(tempWeatherHoldingObject);
  }

  // Function pulling weather data from file in order to not accrue charges from api
  function getSampleWeather() {
    let startingYear = 2022;
    let tempWeatherHoldingObject = {};
    sampleWeatherData.forEach((year) => {
      tempWeatherHoldingObject[startingYear] = year;
      startingYear--;
    });
    setWeatherData(tempWeatherHoldingObject);
  }
  async function getSoilStats() {
    let params =
      "soilMoisture,soilMoisture10cm,soilTemperature,soilTemperature10cm";
    let response = await fetch(
      `https://api.stormglass.io/v2/bio/point?lat=${userLocation.latitude}&lng=${userLocation.longitude}&params=${params}`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_STORMGLASS_API}`,
        },
      }
    );
    let rData = await response.json();
    setSoilData(rData.hours[0]);
  }
  async function dong() {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/soil`);
    let rData = await response.json();

    rData = rData.slice(1).split(",").slice(5);
    // console.log(rData)
    let tempObj = {
      soilMoisture: [],
      soilMoisture10cm: [],
      soilTemperature: [],
      soilTemperature10cm: [],
      time: [],
    };
    let i = 0;
    rData.forEach((item, index) => {
      if (i === 0) {
        tempObj.soilMoisture.push(Number(item));
      } else if (i === 1) {
        tempObj.soilMoisture10cm.push(Number(item));
      } else if (i === 2) {
        tempObj.soilTemperature.push(Number(item));
      } else if (i === 3) {
        tempObj.soilTemperature10cm.push(Number(item));
      } else if (i === 4) {
        tempObj.time.push(item);
        i = -1;
      }
      i++;
    });
    setSoilData(tempObj);
  }

  // Is this needed for anything?
  // async function makeitHappen() {
  //   let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
  //   let rData = await response.json();
  //   console.log(rData);
  // }

  function changeLayer(e) {
    layer.setUrl(e);
    if (e !== "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png") setButtonType('light')
    else {
      setButtonType('outline-dark')
    }
  }

  return (
    <div className="App">
      {userLocation && (
        <Map
          setMap={setMap}
          morelData={filteredMorels}
          userLocation={userLocation}
          setlatLong={setlatLong}
          latLong={latLong}
          user={user}
          userIsAddingNewMarker={userIsAddingNewMarker}
          userPoints={userPoints}
          setUserPoints={setUserPoints}
          layer={layer}
          setLayer={setLayer}
          polyPoints={polyPoints}
          setPolyPoints={setPolyPoints}
          userIsAddingNewPolygon={userIsAddingNewPolygon}
          userPolygons={userPolygons}
          polygonNotes={polygonNotes}
          setPolygonNotes={setPolygonNotes}
        />
      )}
      {loginFormUp && (
        <LoginForm
          setUser={setUser}
          userDB={userDB}
          setLoginFormUp={setLoginFormUp}
        />
      )}
      {user && userIsAddingNewMarker && (
        <AddUserPoint
          userIsAddingNewMarker={userIsAddingNewMarker}
          setUserIsAddingNewMarker={setUserIsAddingNewMarker}
          latLong={latLong}
          user={user}
          setlatLong={setlatLong}
          setUserPoints={setUserPoints}
        />
      )}
      {user && userIsAddingNewPolygon && (
        <AddUserPolygon
          userIsAddingNewPolygon={userIsAddingNewPolygon}
          setUserIsAddingNewPolygon={setUserIsAddingNewPolygon}
          polyPoints={polyPoints}
          setPolyPoints={setPolyPoints}
          user={user}
          setUserPolygons={setUserPolygons}
        />
      )}
      <ToolMenu
        dates={dates}
        getSoilData={dong}
        getSampleWeather={getWeather}
        weatherData={weatherData}
        soilData={soilData}
        setUser={setUser}
        loginFormUp={loginFormUp}
        setLoginFormUp={setLoginFormUp}
        setFilteredMorels={setFilteredMorels}
        years={years}
        userLocation={userLocation}
        setYears={setYears}
        setUserPoints={setUserPoints}
        user={user}
        userPoints={userPoints}
        map={map}
        userCity={userCity}
        setUserPolygons={setUserPolygons}
      />

      <MapTools
        findUser={findUser}
        user={user}
        setUserIsAddingNewMarker={setUserIsAddingNewMarker}
        userIsAddingNewMarker={userIsAddingNewMarker}
        setUserIsAddingNewPolygon={setUserIsAddingNewPolygon}
        userIsAddingNewPolygon={userIsAddingNewPolygon}
        changeLayer={changeLayer}
        setPolyPoints={setPolyPoints}
        setlatLong={setlatLong}
        buttonType={buttonType}
      />
      {polygonNotes && <PolygonNoteBoard text={polygonNotes} setUserPolygons={setUserPolygons} setUserIsAddingNewPolygon={setUserIsAddingNewPolygon} setPolygonNotes={setPolygonNotes}/>}
    </div>

  );
}

export default App;
