
import './App.css';

import ToolMenu from './components/ToolMenu';

import Map from './components/Map';
import WeatherPanel from './components/DataPanels/WeatherPanel';
import MorelsByDistance from './components/queryComponents/MorelsByDistance';
import CurrentWeather from './components/DataPanels/CurrentWeather';
import LoginForm from './components/LoginForm';
import GetUserPoints from './components/mapFeatures/GetUserPoints';
import AddUserPoint from './components/mapFeatures/AddUserPoint';
import { useState, useEffect } from 'react';
import data from './practice'

function App() {
  const [loginFormUp, setLoginFormUp] = useState(false)
  const [user, setUser] = useState(undefined)
  const [userDB, setUserDB] = useState([])
  const [userPoints, setUserPoints] = useState(undefined)
  const [weatherData, setWeatherData] = useState({})
  const [soilData, setSoilData] = useState(undefined)
  const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017])
  const [filteredMorels, setFilteredMorels] = useState([])
  const [userLocation, setUserLocation] = useState(undefined)
  const [userIsAddingNewMarker, setUserIsAddingNewMarker] = useState(false)
  const [latLong, setlatLong] = useState(undefined)
  const [dates, setDates] = useState([])

  useEffect(()=> {

    let fetchUsers = async () => {
      let response = await fetch('http://localhost:5000/users')
      let rData = await response.json()
      setUserDB(rData)
    }
    fetchUsers()
    let getLocation = () => {
      navigator.geolocation.getCurrentPosition((pos)=> {
        setUserLocation({
            latitude: pos.coords.latitude, 
            longitude:pos.coords.longitude})
      })
      
    }
    getLocation()
    
    let tempDates = []
    let d = new Date()
    for (let i=0;i<5;i++){
      let year = d.getFullYear()
      let month = d.getMonth()+1
      let day = d.getDate()
      tempDates.push([`${year-i}-${month}-${day-4}`, `${year-i}-${month}-${day}`])
    }
    setDates(tempDates)
    
  }, [])

  

  
  async function getWeather(){
    const location = `${userLocation.latitude},${userLocation.longitude}`
    let tempWeather = {}
    let i = 0
    let year = new Date().getFullYear()
    while (i<dates.length){
    const dateOne = dates[i][0]
      const dateTwo = dates[i][1]
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateOne}/${dateTwo}?key=${process.env.REACT_APP_API_KEY_TWO}`)
      const rData = await response.json()
      tempWeather[year] = rData
      i++
    }
    setWeatherData(tempWeather)
    
  }

  function getSampleWeather(){
    let i = 2022
    let boop = {}
    data.forEach(year => {
      boop[i] = year
      i--})
    setWeatherData(boop)
  }
  async function getSoilStats(){

    let params = 'soilMoisture,soilMoisture10cm,soilTemperature,soilTemperature10cm'
    let response = await fetch(`https://api.stormglass.io/v2/bio/point?lat=${userLocation.latitude}&lng=${userLocation.longitude}&params=${params}`, {
      headers: {
        'Authorization': `${process.env.REACT_APP_STORMGLASS_API}`
      }
    })
    let rData = await response.json()
    setSoilData(rData.hours[0])

  }
  async function dong(){
    let response = await fetch('http://localhost:5000/soil')
    let rData = await response.json()
    let x = rData.split(',')
    console.log(x)

  }

  async function makeitHappen(){
    let response = await fetch('http://localhost:5000/users')
    let rData = await response.json()
    console.log(rData)
  }

  return (
    <div className="App">
      {/* {user && <h1>Hello {user.username}</h1>}
      <button onClick={getSoilStats}>Click me For Soil</button>
      <button onClick={getSampleWeather}>Click me For Weather</button>
      {!user && <LoginForm setUser={setUser} userDB={userDB}/> }
     
      <MorelsByDistance setFilteredMorels={setFilteredMorels} years={years} userLocation={userLocation} setYears={setYears}/>   */}
      {userLocation && <Map morelData={filteredMorels} userLocation={userLocation} setlatLong={setlatLong} latLong={latLong} user={user} userIsAddingNewMarker={userIsAddingNewMarker} userPoints={userPoints}  setUserPoints={setUserPoints}/> }
      {loginFormUp && <LoginForm setUser={setUser} userDB={userDB} setLoginFormUp={setLoginFormUp}/> }
      {/* {Object.keys(weatherData).length > 0 && <WeatherPanel data={weatherData} dates={dates}/>}
      {Object.keys(weatherData).length > 0 && <CurrentWeather data={weatherData} soilData={soilData}/>}
      {user && <AddUserPoint userIsAddingNewMarker={userIsAddingNewMarker} setUserIsAddingNewMarker={setUserIsAddingNewMarker} latLong={latLong} user={user} setlatLong={setlatLong} setUserPoints={setUserPoints}/> }
      {user && <GetUserPoints userPoints={userPoints} setUserPoints={setUserPoints}/>} */}
      <ToolMenu loginFormUp={loginFormUp} setLoginFormUp={setLoginFormUp}setFilteredMorels={setFilteredMorels} years={years} userLocation={userLocation} setYears={setYears} setUserPoints={setUserPoints} user={user}/>
    </div>
  );
}

export default App;
