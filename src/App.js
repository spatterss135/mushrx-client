
import './App.css';
import Map from './components/Map';
import WeatherPanel from './components/WeatherPanel'
import MorelsByDistance from './components/queryComponents/morelsByDistance';
import CurrentWeather from './components/CurrentWeather';
import { useState, useEffect } from 'react';
import data from './practice'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017])
  const [filteredMorels, setFilteredMorels] = useState([])
  const [userLocation, setUserLocation] = useState(undefined)
  const [dates, setDates] = useState([])

  useEffect(()=> {

    
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

  return (
    <div className="App">
      <button onClick={getSampleWeather}>Click me For Weather</button>
     
      <MorelsByDistance setFilteredMorels={setFilteredMorels} years={years} userLocation={userLocation} setYears={setYears}/> 
      {userLocation && <Map morelData={filteredMorels} userLocation={userLocation}/> }
      
      {Object.keys(weatherData).length > 0 && <WeatherPanel data={weatherData} dates={dates}/>}
      {Object.keys(weatherData).length > 0 && <CurrentWeather data={weatherData}/>}
    </div>
  );
}

export default App;
