import Nav from "react-bootstrap/Nav";
import {
  DropdownButton,
  Dropdown,
  NavDropdown,
  Accordion,
  CloseButton,
  Button,
} from "react-bootstrap";
import PeterPan from "./PeterPan";
import getPoints from "./mapFeatures/GetUserPoints";
import getPolygons from "./mapFeatures/getPolygons";
import CurrentWeather from "./DataPanels/CurrentWeather";
import Loading from "./DataPanels/ProgressPanel";
import { useState, useEffect } from "react";
import WeatherPanel from "./DataPanels/WeatherPanel";

export default function ToolMenu({
  userLocation,
  years,
  setFilteredMorels,
  setYears,
  setUserPoints,
  userPoints,
  user,
  loginFormUp,
  setLoginFormUp,
  setUser,
  soilData,
  weatherData,
  getSampleWeather,
  getSoilData,
  dates,
  map, 
  userCity,
  setUserPolygons
}) {
  const [progress, setProgress] = useState(0);
  const [hw, setHw] = useState(false);

  useEffect(()=> {
    let boop = document.querySelectorAll('.nav-link')
    let boopTwo = document.querySelector('.nav')
    if (boop){
        boop.forEach(b => {
            if (b.textContent == 'My Data') {
                async function l(){
                    await b.click()
                    b.click()}
                l()    
                
                }
        })
        
    }
  }, [user])

  function settleThis() {
    let pointOption = document.querySelector(".points");
    if (userPoints) {
      pointOption.classList.add("active");
    } else if (pointOption) {
      pointOption.classList.remove("active");
    }
    let items = document.querySelectorAll('[myMark="pope"]');
    items.forEach((item) => item.classList.add("active"));
  }
  const handleSelect = (eventKey, e) => {
    if (eventKey == "points" && !e.target.classList.contains("active")) {
      getPoints(setUserPoints, user);
    } else if (eventKey == "points") {
      setUserPoints(undefined);
    }
    if (eventKey == "polygons" && !e.target.classList.contains("active")) {
      getPolygons(setUserPolygons, user);
    } else if (eventKey == "polygons") {
      setUserPolygons(undefined);
    }
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.setAttribute("myMark", "");
    } else {
      e.target.setAttribute("myMark", "pope");
    }
  };
// Not sure if this is useful anymore
//   if (userPoints) {
//     let x = document.querySelector(".points");
//     if (x) x.classList.add("active");
//   }
  return (
    <Nav>
      <div className="nav-1">
        <NavDropdown
          className="hi"
          drop="up"
          title="Historic Data"
          id="nav-dropdown"
        >
          <PeterPan
            setFilteredMorels={setFilteredMorels}
            years={years}
            userLocation={userLocation}
            setYears={setYears}
          />
        </NavDropdown>
        {user && (
          <NavDropdown
            onClick={settleThis}
            drop="up"
            title={"My Data"}
            id="nav-dropdown"
            mymark='boop'
            onLoad={(e)=> console.log("DDHDHDHDH")}
            onSelect={handleSelect}
          >
            <NavDropdown.Item className="points" eventKey="points">
              Points
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="polygons">Polygons</NavDropdown.Item>
          </NavDropdown>
        )}

        <NavDropdown
          onClick={() => {
            getSampleWeather();
            getSoilData();
          }}
          drop="up"
          title="Weather"
          id="nav-dropdown"
        >
          {weatherData && progress > 98 && !hw && (
            <CurrentWeather
              setProgress={setProgress}
              data={weatherData}
              soilData={soilData}
              setHw={setHw}
              userCity={userCity}
            />
          )}
          {hw && progress > 98 && (
            <WeatherPanel
              setHw={setHw}
              setProgress={setProgress}
              data={weatherData}
              dates={dates}
            />
          )}
          {progress < 98 && (
            <Loading progress={progress} setProgress={setProgress} hw={hw} />
          )}
        </NavDropdown>
      </div>

      {!user && (
        <Nav.Item>
          <Nav.Link onClick={() => setLoginFormUp(!loginFormUp)} href="#">
            Sign In
          </Nav.Link>
        </Nav.Item>
      )}
      {user && (
        <Nav.Item
          onClick={() => {
            setUser(undefined);
          }}
        >
          <Nav.Link>{user.username}</Nav.Link>
          <img
            className="avatar"
            src={`Avatars/identicon-${user.avatar}.png`}
            alt=""
          />
        </Nav.Item>
      )}
    </Nav>
  );
}
