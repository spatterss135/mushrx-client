import { useState } from "react"
import { createKeys, getRainfall, getAverageTemp, getAverageHumidity, getHistoricalAverages} from "../functions/WeatherFunctions"

import { Table, Button } from "react-bootstrap"

export default function WeatherPanel({data, dates, setHw, setProgress}){

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
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th colSpan={3}>Current Year vs. Historical Data for {startingDate}-{endDate}</th>
                </tr>
                <tr>
                    <th></th>
                <th>{currentYear}</th>
                <th>2017-2021</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                Cumulative Rainfall (in.)
                </td>
                <td>{weatherStats[currentYear].totalRainInches}</td>
                <td>{weatherStats['historical'].totalRainInches}</td>
            </tr>
            <tr>
                <td>
                Average Temp (F)
                </td>
                <td>{weatherStats[currentYear].averageTemp}</td>
                <td>{weatherStats['historical'].averageTemp}</td>
            </tr>
            <tr>
                <td>
                Average Humidity (%)
                </td>
                <td>{weatherStats[currentYear].averageHumidity}</td>
                <td>{weatherStats['historical'].averageHumidity}</td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colSpan={5}><Button variant="outline-light" onClick={()=> {
                    setProgress(0)
                    setHw(false)}}>Back to Today's Weather</Button></td>
                </tr>
            </tfoot>
        </Table>
    )
}