import "./App.css";
import ToolMenu from "./components/ToolMenu";
import moment from "moment";
import Map from "./components/Map";


import LoginForm from "./components/LoginForm";
import GetUserPoints from "./components/mapFeatures/GetUserPoints";
import AddUserPoint from "./components/mapFeatures/AddUserPoint";
import AddUserPolygon from "./components/mapFeatures/AddUserPolygon";
import MapTools from "./components/MapTools";
import { useState, useEffect } from "react";
import data from "./practice";
import PolygonNoteBoard from "./components/PolygonNoteBoard";


function App() {
  // 1
  const [loginFormUp, setLoginFormUp] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userDB, setUserDB] = useState([]);
  const [userPoints, setUserPoints] = useState(undefined);
  // 5
  const [weatherData, setWeatherData] = useState(undefined);
  const [soilData, setSoilData] = useState(undefined);
  const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017]);
  const [filteredMorels, setFilteredMorels] = useState([]);
  const [userLocation, setUserLocation] = useState(undefined);
  // 10
  const [userIsAddingNewMarker, setUserIsAddingNewMarker] = useState(false);
  const [userIsAddingNewPolygon, setUserIsAddingNewPolygon] = useState(false);
  const [polyPoints, setPolyPoints] = useState(undefined);
  const [userPolygons, setUserPolygons] = useState(undefined)
  const [latLong, setlatLong] = useState(undefined);
  // 15
  const [dates, setDates] = useState([]);
  const [map, setMap] = useState(null);
  const [layer, setLayer] = useState(undefined);
  const [userCity, setUserCity] = useState("Pudding");
  const [polygonNotes, setPolygonNotes] = useState(undefined)

  function findUser() {
    map.flyTo([userLocation.latitude, userLocation.longitude], 10);
  }
  
  useEffect(() => {
    dong();
    let fetchUsers = async () => {
      let response = await fetch("http://localhost:5000/users");
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

  async function getWeather() {
    const location = `${userLocation.latitude},${userLocation.longitude}`;
    let tempWeather = {};
    let i = 0;
    let year = new Date().getFullYear();
    while (i < dates.length) {
      const dateOne = dates[i][0];
      const dateTwo = dates[i][1];
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateOne}/${dateTwo}?key=${process.env.REACT_APP_API_KEY_TWO}`
      );
      const rData = await response.json();
      tempWeather[year] = rData;
      i++;
    }
    setWeatherData(tempWeather);
  }

  function getSampleWeather() {
    let i = 2022;
    let boop = {};
    data.forEach((year) => {
      boop[i] = year;
      i--;
    });
    setWeatherData(boop);
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
    let response = await fetch("http://localhost:5000/soil");
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
      if (i == 0) {
        tempObj.soilMoisture.push(Number(item));
      } else if (i == 1) {
        tempObj.soilMoisture10cm.push(Number(item));
      } else if (i == 2) {
        tempObj.soilTemperature.push(Number(item));
      } else if (i == 3) {
        tempObj.soilTemperature10cm.push(Number(item));
      } else if (i == 4) {
        tempObj.time.push(item);
        i = -1;
      }
      i++;
    });
    setSoilData(tempObj);
  }

  async function makeitHappen() {
    let response = await fetch("http://localhost:5000/users");
    let rData = await response.json();
    console.log(rData);
  }

  function changeLayer(e) {
    layer.setUrl(e);
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
        getSampleWeather={getSampleWeather}
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
      />
      {polygonNotes && <PolygonNoteBoard text={polygonNotes} setUserPolygons={setUserPolygons} setUserIsAddingNewPolygon={setUserIsAddingNewPolygon} setPolygonNotes={setPolygonNotes}/>}
    </div>

  );
}

export default App;
