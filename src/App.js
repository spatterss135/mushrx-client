import "./App.css";
import ToolMenu from "./components/ToolMenu";
import moment from "moment";
import Map from "./components/Map";
import WeatherPanel from "./components/DataPanels/WeatherPanel";
import MorelsByDistance from "./components/queryComponents/MorelsByDistance";
import CurrentWeather from "./components/DataPanels/CurrentWeather";
import LoginForm from "./components/LoginForm";
import GetUserPoints from "./components/mapFeatures/GetUserPoints";
import AddUserPoint from "./components/mapFeatures/AddUserPoint";
import { useState, useEffect } from "react";
import data from "./practice";
import {
  DropdownButton,
  Dropdown,
  NavDropdown,
  Accordion,
  CloseButton,
  Button,
  ButtonGroup,
} from "react-bootstrap";

function App() {
  const [loginFormUp, setLoginFormUp] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userDB, setUserDB] = useState([]);
  const [userPoints, setUserPoints] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);
  const [soilData, setSoilData] = useState(undefined);
  const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017]);
  const [filteredMorels, setFilteredMorels] = useState([]);
  const [userLocation, setUserLocation] = useState(undefined);
  const [userIsAddingNewMarker, setUserIsAddingNewMarker] = useState(false);
  const [latLong, setlatLong] = useState(undefined);
  const [dates, setDates] = useState([]);
  const [map, setMap] = useState(null);
  const [layer, setLayer] = useState(undefined);
  const [userCity, setUserCity] = useState('Pudding')

  function findUser() {
    map.flyTo([userLocation.latitude, userLocation.longitude]);
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

  useEffect(()=> {
    async function getCity(){
      if (userLocation){
      let response = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-position/${userLocation.latitude}/${userLocation.longitude}?language=en`, {headers: {'apiKey': `${process.env.REACT_APP_GEOCODE}`}})
      let rData = await response.json()
      console.log(rData)
      setUserCity(rData.locations[0].address.city)
      }

    }
    getCity()
  }, [userLocation])

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
    layer.setUrl(e)
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
        />
      )}
      {loginFormUp && (
        <LoginForm
          setUser={setUser}
          userDB={userDB}
          setLoginFormUp={setLoginFormUp}
        />
      )}
      {user && (
        <AddUserPoint
          userIsAddingNewMarker={userIsAddingNewMarker}
          setUserIsAddingNewMarker={setUserIsAddingNewMarker}
          latLong={latLong}
          user={user}
          setlatLong={setlatLong}
          setUserPoints={setUserPoints}
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
      />

      <ButtonGroup vertical>
        <Button onClick={findUser} variant="outline-dark" title="Find User">
          <img className="userlocate-btn" src="Icons/user.png" />
        </Button>
        {user && (
          <Button
            onClick={() => setUserIsAddingNewMarker(true)}
            variant="outline-dark"
            title="Add Point"
          >
            <img className="userlocate-btn" src="Icons/plus.png" />
          </Button>
        )}
        <Dropdown onSelect={changeLayer} as={ButtonGroup} drop="start" variant="outline-dark">
          <Dropdown.Toggle id="dropdown-custom-1" variant="outline-dark">
            <img className="userlocate-btn" src="Icons/map.png" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <Dropdown.Item
              eventKey="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
              StreetMap
            </Dropdown.Item>
            <Dropdown.Item eventKey="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">
              TopoMap
            </Dropdown.Item>
            <Dropdown.Item eventKey="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=6cc7d3a6b182473e8aa8a19d7838d306">
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
}

export default App;
