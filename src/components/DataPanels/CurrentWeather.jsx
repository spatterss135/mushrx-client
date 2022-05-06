import ToFarenheit from '../functions/ToFarenheit'
import { Table, Button } from 'react-bootstrap'

export default function CurrentWeather({data, soilData, setHw, setProgress, userCity}){

    const currentYear = new Date().getFullYear()
    return(
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th colSpan={5}>Todays Weather In {userCity}</th>
                </tr>
                <tr>
                    <th>Description</th>
                </tr>
                <tr>
                    <th>Temp (F)</th>
                    <th>Humidity (%)</th>
                    <th>Wind Speed (mph)</th>
                    <th>Soil Moisture(%)</th>
                    <th>Soil Temperature(F)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data[currentYear].days[4].temp}</td>
                    <td>{data[currentYear].days[4].humidity}</td>
                    <td>{data[currentYear].days[4].windspeed}</td>
                    <td>{soilData && soilData['soilMoisture'][0]}</td>
                    <td>{soilData && ToFarenheit(soilData['soilTemperature'][0])}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colSpan={5}><Button variant="outline-light" onClick={()=> {
                    setProgress(0)
                    setHw(true)}}>Compare to historical weather in this area</Button></td>
                </tr>
            </tfoot>
        </Table>
    )
}