import { useState } from "react"
import { createKeys, getRainfall, getAverageTemp, getAverageHumidity, getHistoricalAverages} from "./functions/WeatherFunctions"

export default function WeatherPanel({data, dates}){

    const weatherStats = {}

    let startingDate = `${new Date(dates[0][0]).getMonth()+1}/${new Date(dates[0][0]).getDate()}` 
    let endDate = `${new Date(dates[0][1]).getMonth()+1}/${new Date(dates[0][1]).getDate()}`

    createKeys(weatherStats, data)
    getRainfall(weatherStats, data)
    getAverageHumidity(weatherStats, data)
    getAverageTemp(weatherStats, data)
    getHistoricalAverages(weatherStats)

    const currentYear = new Date().getFullYear()
    return (
        <table className="weather-panel">
            <tr>
                <th>Current Year vs. Historical Data for {startingDate}-{endDate}</th>
            </tr>
            <tr>
                <th>{currentYear}</th>
                <th>2017-2021</th>
            </tr>
            <tr>
                Cumulative Rainfall (in.)
                <td>{weatherStats[currentYear].totalRainInches}</td>
                <td>{weatherStats['historical'].totalRainInches}</td>
            </tr>
            <tr>
                Average Temp (F)
                <td>{weatherStats[currentYear].averageTemp}</td>
                <td>{weatherStats['historical'].averageTemp}</td>
            </tr>
            <tr>
                Average Humidity (%)
                <td>{weatherStats[currentYear].averageHumidity}</td>
                <td>{weatherStats['historical'].averageHumidity}</td>
            </tr>
        </table>
    )
}