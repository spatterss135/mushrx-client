import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import MorelForm from "./MorelForm";
import getPoints from "./mapFeatures/GetUserPoints";
import getPolygons from "./mapFeatures/getPolygons";
import CurrentWeather from "./DataPanels/CurrentWeather";
import Loading from "./DataPanels/ProgressPanel";
import { useState, useEffect, useRef } from "react";
import WeatherPanel from "./DataPanels/WeatherPanel";
import moment from "moment";
import UserMenu from "./UserMenu";


import { usePointInfo, usePointInfoUpdate } from "../context/PointContext";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";
import { usePolygonInfo, usePolygonInfoUpdate } from "../context/PolygonContext";
import { useLoginInfo, useLoginInfoUpdate } from "../context/LoginContext";
import { useApiInfo, useApiInfoUpdate } from "../context/ApiContext";

export default function ToolMenu({
  map,
  sampleWeatherData,
  setFriendBoxUp,
  friendBoxUp
}) {
  const pointInfo = usePointInfo();
  const setPointInfo = usePointInfoUpdate();

  const polygonInfo = usePolygonInfo()
  const setPolygonInfo = usePolygonInfoUpdate()

  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

  const loginInfo = useLoginInfo()
  const setLoginInfo = useLoginInfoUpdate()

  const apiInfo = useApiInfo()
  const setApiInfo = useApiInfoUpdate()

  const [progress, setProgress] = useState(0);
  const [hw, setHw] = useState(false);

  const navigation= useRef('')

  // async function postHelp(){
  //   let response = await fetch( `${process.env.REACT_APP_BACKEND_URL}/friends`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({ user_id: 8, friend_id: 9}),
  //   }
  // )
  // }
  
  useEffect(() => {
    
    function getDatesForWeatherStats() {
      let tempDates = [];
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
      setApiInfo({weatherData : { dates:tempDates, data: apiInfo.weatherData.data}});
    }
    getDatesForWeatherStats();
  }, []);


  useEffect(() => {


    if (userInfo.userMenuUp){
      navigation.current.classList.add('vanish')
      navigation.current.classList.remove('reappear')
    }
    else{
      if (navigation.current.classList.contains('vanish')){
        navigation.current.classList.add('reappear')
        navigation.current.classList.remove('vanish')
      }
      
      
    }
    let boop = document.querySelectorAll(".nav-link");
    if (boop) {
      boop.forEach((b) => {
        if (b.textContent === "My Data") {
          async function l() {
            await b.click();
            b.click();
          }
          l();
        }
      });
    }
  }, [userInfo]);

  // Actual function for requesting weather data for last 5 years. Accrues heavy cost via api call
  async function getWeather() {
    const location = `${userInfo.userLocation.latitude},${userInfo.userLocation.longitude}`;
    let tempWeatherHoldingObject = {};
    let currentYear = new Date().getFullYear();
    for (let i = 0; i < apiInfo.morels.dates.length; i++) {
      const dateOne = apiInfo.morels.dates[i][0];
      const dateTwo = apiInfo.morels.dates[i][1];
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateOne}/${dateTwo}?key=${process.env.REACT_APP_API_KEY_TWO}`
      );
      const rData = await response.json();
      tempWeatherHoldingObject[currentYear] = rData;
      currentYear--;
    }
    setApiInfo({weatherData: {data: apiInfo.weatherData.data, data: tempWeatherHoldingObject}});
  }

  // Function pulling weather data from file in order to not accrue charges from api
  function getSampleWeather() {
    let startingYear = 2022;
    let tempWeatherHoldingObject = {};
    sampleWeatherData.forEach((year) => {
      tempWeatherHoldingObject[startingYear] = year;
      startingYear--;
    });
    setApiInfo({weatherData: {dates: apiInfo.weatherData.dates, data: tempWeatherHoldingObject}});
  }
  async function getSoilStats() {
    let params =
      "soilMoisture,soilMoisture10cm,soilTemperature,soilTemperature10cm";
    let response = await fetch(
      `https://api.stormglass.io/v2/bio/point?lat=${userInfo.userLocation.latitude}&lng=${userInfo.userLocation.longitude}&params=${params}`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_STORMGLASS_API}`,
        },
      }
    );
    let rData = await response.json();
    setApiInfo({soilData: rData.hours[0]});
  }
  async function getSampleSoilStats() {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/soil`);
    let rData = await response.json();

    rData = rData.slice(1).split(",").slice(5);
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
    setApiInfo({soilData: tempObj});
  }

  function settleThis() {
    let pointOption = document.querySelector(".points");
    if (pointInfo.userPoints) {
      pointOption.classList.add("active");
    } else if (pointOption) {
      pointOption.classList.remove("active");
    }
    let items = document.querySelectorAll('[myMark="pope"]');
    items.forEach((item) => item.classList.add("active"));
  }
  const handleSelect = async (eventKey, e) => {
    if (eventKey === "points" && !e.target.classList.contains("active")) {
      getPoints(setPointInfo, userInfo.user);
    } else if (eventKey === "points") {
      setPointInfo({ userPoints: undefined });
    }
    if (eventKey === "polygons" && !e.target.classList.contains("active")) {
      let data = await getPolygons(userInfo.user.id);
      setPolygonInfo({userPolygons: data})
    } else if (eventKey === "polygons") {
      setPolygonInfo({userPolygons: undefined})
    }
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.setAttribute("myMark", "");
    } else {
      e.target.setAttribute("myMark", "pope");
    }
  };

  function weatherPanelClickHandler(e) {
    if (!apiInfo.soilData || !apiInfo.weatherData.data) {

      setProgress(0);
    }
    if (userInfo.userHasChangedLocations) {
      getSampleWeather();
      getSampleSoilStats()
      setUserInfo({ userHasChangedLocations: false });
    }
  }

  return (
    <Nav ref={navigation}>
      <div className="nav-1">
        <NavDropdown
          className="hi"
          drop="up"
          title="Historic Data"
          id="nav-dropdown"
        >
          <MorelForm
          />
        </NavDropdown>
        {userInfo.user && (
          <NavDropdown
            onClick={settleThis}
            drop="up"
            title={"My Data"}
            id="nav-dropdown"
            mymark="boop"

            onSelect={handleSelect}
          >
            <NavDropdown.Item className="points" eventKey="points">
              Points
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="polygons">Polygons</NavDropdown.Item>
          </NavDropdown>
        )}

        <NavDropdown
          onClick={weatherPanelClickHandler}
          drop="up"
          title="Weather"
          id="nav-dropdown"
        >
          {apiInfo.weatherData.data && !hw && progress >= 98 &&(
            <CurrentWeather
              setProgress={setProgress}
              data={apiInfo.weatherData.data}
              soilData={apiInfo.soilData}
              setHw={setHw}
              map={map}
            />
          )}
          
          {hw && progress >= 98 && (
            <WeatherPanel
              setHw={setHw}
              setProgress={setProgress}
            />
          )}
          {progress < 98 && !userInfo.userChangingLocation && (
            <Loading progress={progress} setProgress={setProgress} hw={hw} />
          )}
        </NavDropdown>
      </div>

      {!userInfo.user && (
        <Nav.Item>
          <Nav.Link onClick={() => setLoginInfo({loginFormUp: !loginInfo.loginFormUp})} href="#">
            Sign In
          </Nav.Link>
        </Nav.Item>
      )}
      {userInfo.user && (
        <UserMenu />
      )}
      
    </Nav>
  );
}
