

export default function CurrentWeather({data}){

    const currentYear = new Date().getFullYear()
    return(
        <table className="current-weather">
            <thead>
            <tr>
                <th>Todays Weather in Madison</th>
            </tr>
                <tr>
                    <th>Description</th>
                    
                </tr>
                <tr>
                    <th>Temp (F)</th>
                    <th>Humidity (%)</th>
                    <th>Wind Speed (mph)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data[currentYear].days[4].temp}</td>
                    <td>{data[currentYear].days[4].humidity}</td>
                    <td>{data[currentYear].days[4].windspeed}</td>
                </tr>
            </tbody>
        </table>
    )
}